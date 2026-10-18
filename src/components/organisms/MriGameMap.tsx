import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polygon, Polyline, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { cn } from '../../lib/utils'

/** A point in GTA world units; z is kept by the caller and ignored by the map. */
export interface MriMapPoint {
  x: number
  y: number
  z?: number
}

export type MriMapTone = 'primary' | 'warning' | 'destructive' | 'muted'

export const GTA_MAP_TILES = 'https://assets.mriqbox.com.br/admin/map/tiles_atlas/{z}/{x}/{y}.webp'

// Affine transform that lines GTA world units up with the atlas tiles.
export const GTA_CRS = L.Util.extend({}, L.CRS.Simple, {
  transformation: new L.Transformation(0.02072, 117.3, -0.0205, 172.8),
}) as L.CRS

export const toMapLatLng = (p: MriMapPoint): L.LatLngTuple => [p.y, p.x]
export const fromMapLatLng = (latLng: L.LatLng, z?: number): MriMapPoint => ({ x: latLng.lng, y: latLng.lat, ...(z !== undefined && { z }) })

/** Leaflet map instance of the closest MriGameMap, for anything the helpers below do not cover. */
export const useMriMap = useMap

export interface MriGameMapProps {
  children?: ReactNode
  className?: string
  /** Start view; MriMapFit usually replaces it on the first render. */
  center?: MriMapPoint
  zoom?: number
  minZoom?: number
  maxZoom?: number
  /** Click on empty map, in world units. */
  onMapClick?: (point: MriMapPoint) => void
  tiles?: string
}

// Leaflet measures its box once; panels grow in after mount, so it remeasures on resize.
function Resize() {
  const map = useMap()
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])
  return null
}

function ClickHandler({ onMapClick }: { onMapClick: (point: MriMapPoint) => void }) {
  useMapEvents({ click: (e) => onMapClick(fromMapLatLng(e.latlng)) })
  return null
}

/**
 * Map of Los Santos with the MRI atlas tiles, in GTA world coordinates.
 *
 * ```tsx
 * <MriGameMap>
 *   <MriMapFit points={garages.flatMap((g) => g.points)} />
 *   {garages.map((g) => <MriMapPolygon key={g.id} points={g.points} tooltip={g.label} onClick={() => select(g.id)} />)}
 * </MriGameMap>
 * ```
 */
export function MriGameMap({ children, className, center = { x: 0, y: 0 }, zoom = 2, minZoom = 1, maxZoom = 5, onMapClick, tiles = GTA_MAP_TILES }: MriGameMapProps) {
  return (
    <div className={cn('mri-game-map relative isolate h-full w-full overflow-hidden', className)}>
      <MapContainer
        crs={GTA_CRS}
        center={toMapLatLng(center)}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full"
      >
        <TileLayer url={tiles} noWrap tileSize={256} minZoom={0} maxZoom={5} />
        <Resize />
        {onMapClick && <ClickHandler onMapClick={onMapClick} />}
        {children}
      </MapContainer>
    </div>
  )
}

export interface MriMapFitProps {
  points: MriMapPoint[]
  padding?: number
  maxZoom?: number
  /** Frame only the first time points arrive (default), so the map does not jump while editing. */
  once?: boolean
}

/** Frames every point, e.g. the first view of a panel shows all its places instead of the whole island. */
export function MriMapFit({ points, padding = 60, maxZoom = 3, once = true }: MriMapFitProps) {
  const map = useMap()
  const done = useRef(false)
  const key = pointsKey(points)
  useEffect(() => {
    if ((once && done.current) || !points.length) return
    done.current = true
    map.fitBounds(L.latLngBounds(points.map(toMapLatLng)), { padding: [padding, padding], maxZoom })
  }, [map, key]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export interface MriMapFocusProps {
  /** What to bring into view; null leaves the map where it is. */
  points: MriMapPoint[] | null
  /** Zoom in at least this far; without it a single place is only panned to. */
  zoom?: number
  padding?: number
}

const FOCUS_RADIUS = 40

/** Flies to the selection whenever it changes: a pan for one place, a frame for a spread out group. */
export function MriMapFocus({ points, zoom, padding = 60 }: MriMapFocusProps) {
  const map = useMap()
  const key = points ? pointsKey(points) : ''
  useEffect(() => {
    if (!points?.length) return
    const bounds = L.latLngBounds(points.map(toMapLatLng))
    const tight = bounds.getNorthEast().distanceTo(bounds.getSouthWest()) < FOCUS_RADIUS * 2
    if (tight && zoom === undefined) map.panTo(bounds.getCenter(), { animate: true })
    else if (tight) map.flyTo(bounds.getCenter(), Math.max(map.getZoom(), zoom!), { duration: 0.6 })
    else map.flyToBounds(bounds, { padding: [padding, padding], maxZoom: zoom ?? map.getZoom(), duration: 0.6 })
  }, [map, key]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

const pointsKey = (points: MriMapPoint[]) => points.map((p) => `${p.x.toFixed(0)},${p.y.toFixed(0)}`).join('|')

export interface MriMapMarkerProps {
  position: MriMapPoint
  /** Icon markup inside the pin; without it the pin is a plain dot. */
  html?: string
  size?: number
  active?: boolean
  /** Small counter on the pin corner, e.g. how many floors share it. */
  count?: number
  tooltip?: ReactNode
  /** Keeps the tooltip open, for the selected place. */
  permanent?: boolean
  onClick?: () => void
  /** Makes the pin draggable; returns where it was dropped, keeping the original z. */
  onDragEnd?: (point: MriMapPoint) => void
  /** Draws html as given, without the round pin around it (sprites, photos). */
  bare?: boolean
  zIndexOffset?: number
}

function pinIcon(html: string | undefined, size: number, active: boolean, bare: boolean, count?: number) {
  const badge = count && count > 1 ? `<span class="mri-map-pin-count">${count}</span>` : ''
  const look = bare ? 'mri-map-bare' : `mri-map-pin${html ? '' : ' is-dot'}`
  return L.divIcon({
    html: `<div class="${look}${active ? ' is-active' : ''}" style="width:${size}px;height:${size}px">${html ?? ''}${badge}</div>`,
    className: 'mri-map-pin-root',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

/** A pin on the map in world coordinates, with the panel theme. */
export function MriMapMarker({ position, html, size, active = false, count, tooltip, permanent, onClick, onDragEnd, bare = false, zIndexOffset }: MriMapMarkerProps) {
  const px = size ?? (html ? (active ? 34 : 28) : active ? 22 : 16)
  const built = useMemo(() => pinIcon(html, px, active, bare, count), [html, px, active, bare, count])
  return (
    <Marker
      position={toMapLatLng(position)}
      icon={built}
      draggable={!!onDragEnd}
      zIndexOffset={zIndexOffset ?? (active ? 1000 : 0)}
      eventHandlers={{
        click: () => onClick?.(),
        dragend: (e) => onDragEnd?.(fromMapLatLng((e.target as L.Marker).getLatLng(), position.z)),
      }}
    >
      {tooltip !== undefined && (
        <Tooltip direction="top" offset={[0, -(px / 2 + 2)]} permanent={permanent}>
          {tooltip}
        </Tooltip>
      )}
    </Marker>
  )
}

export interface MriMapPolygonProps {
  points: MriMapPoint[]
  tone?: MriMapTone
  active?: boolean
  dashed?: boolean
  tooltip?: ReactNode
  permanent?: boolean
  onClick?: () => void
}

/** An area drawn in the world (zone, lot, no-parking area), filled with the tone colour. */
export function MriMapPolygon({ points, tone = 'primary', active = false, dashed, tooltip, permanent, onClick }: MriMapPolygonProps) {
  if (points.length < 3) return null
  return (
    // react-leaflet reads className only when the layer is created, so a new look remounts it
    <Polygon
      key={`${tone}-${active}`}
      className={cn('mri-map-shape', `is-${tone}`, active && 'is-active')}
      positions={points.map(toMapLatLng)}
      pathOptions={{ weight: active ? 3 : 2, dashArray: dashed ? '6 6' : undefined }}
      eventHandlers={{ click: () => onClick?.() }}
    >
      {tooltip !== undefined && (
        <Tooltip direction="top" sticky={!permanent} permanent={permanent}>
          {tooltip}
        </Tooltip>
      )}
    </Polygon>
  )
}

export interface MriMapPolylineProps {
  points: MriMapPoint[]
  tone?: MriMapTone
  dashed?: boolean
}

/** A line between places, e.g. the floors of one elevator. */
export function MriMapPolyline({ points, tone = 'primary', dashed = true }: MriMapPolylineProps) {
  if (points.length < 2) return null
  return <Polyline key={tone} className={cn('mri-map-line', `is-${tone}`)} positions={points.map(toMapLatLng)} pathOptions={{ weight: 2, dashArray: dashed ? '6 6' : undefined }} />
}
