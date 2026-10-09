import { useCallback, useEffect, useRef, useState } from 'react'
import { applyUiConfig, type MriUiConfig } from './applyUiConfig'
import { DEFAULT_ACCENT, isHexColor, setSuiteAccent, setSuiteBackground } from './suiteColors'

/** Visual config the mri_Qadmin host forwards from the ox_lib /uiconfig panel. */
export type MriPluginUiConfig = MriUiConfig & { theme?: string }

/** Messages the host (mri_Qadmin) posts to the plugin iframe. */
export type MriPluginHostMessage =
  | {
      type: 'mri-plugin/init'
      accentColor: string
      backgroundColor?: string
      uiConfig?: MriPluginUiConfig
      locale: string
      perms: string[]
      page?: string
      category?: string
      focus?: string
    }
  | { type: 'mri-plugin/theme-changed'; accentColor: string; backgroundColor?: string; uiConfig?: MriPluginUiConfig }
  | { type: 'mri-plugin/perms-changed'; perms: string[] }
  | { type: 'mri-plugin/close' }
  | { type: 'mri-plugin/navigate'; page?: string; category?: string; focus?: string }
  | { type: 'mri-plugin/visibility'; visible: boolean }

/** Messages the plugin posts to the host. */
export type MriPluginGuestMessage = { type: 'mri-plugin/ready' } | { type: 'mri-plugin/request-close' }

export interface MriPluginTarget {
  page?: string
  category?: string
  focus?: string
}

export const isMriPluginMessage = (data: unknown): data is MriPluginHostMessage | MriPluginGuestMessage =>
  typeof data === 'object' &&
  data !== null &&
  typeof (data as { type?: unknown }).type === 'string' &&
  (data as { type: string }).type.startsWith('mri-plugin/')

/** mri_Qadmin opens plugins with `?embedded=1`; every FiveM NUI is an iframe, so window.top cannot tell. */
export function isPluginEmbedded(): boolean {
  return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('embedded') === '1'
}

/** Applies the host theme: accent, background, /uiconfig and data-theme. */
export function applyHostTheme(theme: { accentColor?: string; backgroundColor?: string; uiConfig?: MriPluginUiConfig | null }): void {
  if (isHexColor(theme.accentColor)) setSuiteAccent(theme.accentColor)
  if (theme.backgroundColor !== undefined) setSuiteBackground(theme.backgroundColor)
  const cfg = theme.uiConfig
  if (!cfg || typeof cfg !== 'object' || typeof document === 'undefined') return
  applyUiConfig(cfg)
  if (cfg.theme) {
    document.documentElement.setAttribute('data-theme', cfg.theme === 'glass' || cfg.theme === 'liquid' ? cfg.theme : 'dark')
  }
}

export interface MriPluginBridge extends MriPluginTarget {
  accentColor: string
  backgroundColor: string
  uiConfig: MriPluginUiConfig | null
  locale: string
  perms: string[]
  /** True after the host init; render the panel only then. */
  initialized: boolean
  /** False while the host panel is hidden (the iframe stays mounted). */
  visible: boolean
  embedded: boolean
  requestClose: () => void
}

export interface UsePluginBridgeGuestOptions {
  defaultAccentColor?: string
  defaultLocale?: string
  /** Applies the host theme before the panel paints (default true). */
  applyTheme?: boolean
  /** ESC asks the host to close, since keys pressed in the iframe never reach it (default true). */
  closeOnEscape?: boolean
  onClose?: () => void
  onNavigate?: (target: MriPluginTarget) => void
}

const OPEN_LAYER = '[data-radix-popper-content-wrapper], [role="dialog"], [role="listbox"]'

/**
 * Guest side of the mri_Qadmin plugin bridge: sends `ready`, applies the theme from `init`
 * synchronously (no flash of default colors), closes on ESC and tracks perms, page and visibility.
 */
export function usePluginBridgeGuest(options: UsePluginBridgeGuestOptions = {}): MriPluginBridge {
  const { defaultAccentColor = DEFAULT_ACCENT, defaultLocale = 'pt-BR', closeOnEscape = true } = options

  const [state, setState] = useState(() => ({
    accentColor: defaultAccentColor,
    backgroundColor: '',
    uiConfig: null as MriPluginUiConfig | null,
    locale: defaultLocale,
    perms: [] as string[],
    page: undefined as string | undefined,
    category: undefined as string | undefined,
    focus: undefined as string | undefined,
    initialized: false,
    visible: true,
  }))

  const optionsRef = useRef(options)
  useEffect(() => {
    optionsRef.current = options
  })

  const sendToHost = useCallback((msg: MriPluginGuestMessage) => {
    if (typeof window === 'undefined' || window.self === window.top) return
    window.parent.postMessage(msg, '*')
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isMriPluginMessage(event.data)) return
      const msg = event.data as MriPluginHostMessage
      switch (msg.type) {
        case 'mri-plugin/init':
          if (optionsRef.current.applyTheme !== false) applyHostTheme(msg)
          setState({
            accentColor: msg.accentColor,
            backgroundColor: msg.backgroundColor ?? '',
            uiConfig: msg.uiConfig ?? null,
            locale: msg.locale,
            perms: msg.perms ?? [],
            page: msg.page,
            category: msg.category,
            focus: msg.focus,
            initialized: true,
            visible: true,
          })
          break
        case 'mri-plugin/theme-changed':
          if (optionsRef.current.applyTheme !== false) applyHostTheme(msg)
          // The host sometimes sends only the accent: keep the previous values.
          setState((prev) => ({
            ...prev,
            accentColor: msg.accentColor,
            backgroundColor: msg.backgroundColor ?? prev.backgroundColor,
            uiConfig: msg.uiConfig ?? prev.uiConfig,
          }))
          break
        case 'mri-plugin/perms-changed':
          setState((prev) => ({ ...prev, perms: msg.perms }))
          break
        case 'mri-plugin/visibility':
          setState((prev) => ({ ...prev, visible: msg.visible }))
          break
        case 'mri-plugin/navigate':
          setState((prev) => ({ ...prev, page: msg.page, category: msg.category, focus: msg.focus }))
          optionsRef.current.onNavigate?.({ page: msg.page, category: msg.category, focus: msg.focus })
          break
        case 'mri-plugin/close':
          optionsRef.current.onClose?.()
          break
      }
    }
    window.addEventListener('message', onMessage)
    sendToHost({ type: 'mri-plugin/ready' })
    return () => window.removeEventListener('message', onMessage)
  }, [sendToHost])

  const requestClose = useCallback(() => sendToHost({ type: 'mri-plugin/request-close' }), [sendToHost])

  useEffect(() => {
    if (!closeOnEscape || !state.initialized) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' && e.key !== 'Esc') return
      // An open dropdown, popover or modal owns the ESC.
      if (e.defaultPrevented || document.querySelector(OPEN_LAYER)) return
      requestClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeOnEscape, state.initialized, requestClose])

  return { ...state, embedded: isPluginEmbedded(), requestClose }
}
