import { useEffect, useState, useRef, useCallback } from 'react';
import { AlertCircle, Wifi, Monitor as MonitorIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MriKeyboardVisualizer } from '@/components/organisms/MriKeyboardVisualizer';
import { MriButton } from '@/components/atoms/MriButton';
import { MriSpinner } from '@/components/atoms/MriSpinner';

export interface MriPlayerScreenStreamProps {
    playerId: number | string;
    playerName?: string;
    className?: string;
    onFpsUpdate?: (fps: number) => void;
    autoPlay?: boolean;
    muted?: boolean;
    isMock?: boolean;
    showKeyboard?: boolean;
    // Decoupled Logic Props
    onSendNui?: (method: string, data?: unknown) => Promise<unknown>;
    onNuiEvent?: (event: string, callback: (data: unknown) => void) => () => void;
    signaling?: {
        init: (url: string | null, id: string, provider: string) => void;
        disconnect: () => void;
        send: (msg: unknown) => void;
        onMessage: (callback: (msg: unknown) => void) => () => void;
        onConnect: (callback: () => void) => void;
        isConnected?: () => boolean;
    };
    subscribeFromCF?: (sessionId: string, trackName: string) => Promise<{ pc: RTCPeerConnection; stream: MediaStream }>;
    webrtcConfig?: {
        url: string | null;
        provider: 'websocket' | 'fivem-native' | 'cloudflare-sfu';
        iceServers?: RTCIceServer[];
    };
    selfId?: string | number;
    labels?: {
        connecting?: string;
        error_title?: string;
        error_desc?: string;
        retry?: string;
        live?: string;
        stable?: string;
        mock_active?: string;
        simulator?: string;
    };
}

const DEFAULT_RTC_CONFIG = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

export function MriPlayerScreenStream({
    playerId,
    // playerName is not used in this component but kept for API consistency if needed
    className,
    onFpsUpdate,
    autoPlay = true,
    muted = true,
    isMock = false,
    showKeyboard = false,
    onSendNui,
    onNuiEvent,
    signaling,
    subscribeFromCF,
    webrtcConfig,
    selfId,
    labels
}: MriPlayerScreenStreamProps) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<RTCPeerConnection | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);

    const getLabel = useCallback((key: keyof NonNullable<MriPlayerScreenStreamProps['labels']>, fallback: string) => {
        return labels?.[key] || fallback;
    }, [labels]);

    // ── Key Visualization ──
    useEffect(() => {
        if (!onNuiEvent) return;

        const handleKeys = (data: unknown) => {
            const castedData = data as { id: string | number, keys: string[] };
            if (String(castedData.id) === String(playerId)) {
                setPressedKeys(castedData.keys);
            }
        };

        const stopListening = onNuiEvent('ReceivePlayerKeys', handleKeys);

        // Browser Event Simulator (for testing without game)
        const handleBrowserKeys = (e: KeyboardEvent) => {
            if (!isMock) return;

            const keyMap: Record<string, string> = {
                'w': 'W', 'a': 'A', 's': 'S', 'd': 'D',
                ' ': 'SPACE', 'Shift': 'SHIFT', 'Control': 'CTRL', 'Alt': 'ALT',
                'Tab': 'TAB', 'Enter': 'ENTER', 'Escape': 'ESC', 'Backspace': 'BACK',
                'ArrowUp': 'UP', 'ArrowDown': 'DWN', 'ArrowLeft': 'LFT', 'ArrowRight': 'RGT',
                'numpad/': 'NUM /', 'numpad*': 'NUM *', 'numpad-': 'NUM -',
                'numpad+': 'NUM +', 'numpad.': 'NUM .', 'numpad0': 'NUM 0', 'numpad1': 'NUM 1',
                'numpad2': 'NUM 2', 'numpad3': 'NUM 3', 'numpad4': 'NUM 4', 'numpad5': 'NUM 5',
                'numpad6': 'NUM 6', 'numpad7': 'NUM 7', 'numpad8': 'NUM 8', 'numpad9': 'NUM 9'
            };

            let label = keyMap[e.key] || e.key.toUpperCase();
            if (e.code.startsWith('Numpad')) {
                const numKey = e.code.replace('Numpad', 'NUM ');
                if (keyMap[e.code.toLowerCase()]) label = keyMap[e.code.toLowerCase()];
                else label = numKey;
                if (e.code === 'NumpadEnter') label = 'NUM ENTER';
            }

            setPressedKeys(prev => {
                if (e.type === 'keydown') {
                    return prev.includes(label) ? prev : [...prev, label];
                } else {
                    return prev.filter(k => k !== label);
                }
            });
        };

        const handleMouse = (e: MouseEvent) => {
            if (!isMock) return;
            const label = e.button === 0 ? 'LMB' : e.button === 2 ? 'RMB' : null;
            if (!label) return;

            setPressedKeys(prev => {
                if (e.type === 'mousedown') {
                    return prev.includes(label) ? prev : [...prev, label];
                } else {
                    return prev.filter(k => k !== label);
                }
            });
        };

        if (isMock) {
            window.addEventListener('keydown', handleBrowserKeys);
            window.addEventListener('keyup', handleBrowserKeys);
            window.addEventListener('mousedown', handleMouse);
            window.addEventListener('mouseup', handleMouse);
        }

        return () => {
            stopListening();
            if (isMock) {
                window.removeEventListener('keydown', handleBrowserKeys);
                window.removeEventListener('keyup', handleBrowserKeys);
                window.removeEventListener('mousedown', handleMouse);
                window.removeEventListener('mouseup', handleMouse);
            }
        };
    }, [playerId, onNuiEvent, isMock]);

    useEffect(() => {
        if (!playerId || isMock || !onSendNui) return;
        onSendNui('StartWatchingPlayer', { targetId: playerId }).catch(() => { });
        return () => {
            onSendNui('StopWatchingPlayer', { targetId: playerId }).catch(() => { });
        };
    }, [playerId, onSendNui, isMock]);

    // ── Init Signaling ──
    useEffect(() => {
        if (!playerId || !signaling || !webrtcConfig || !selfId) return;

        signaling.init(webrtcConfig.url, 'viewer-' + selfId, webrtcConfig.provider);

        return () => {
            signaling.disconnect();
        };
    }, [signaling, webrtcConfig, playerId, selfId]);

    // ── Signaling / WebRTC Logic ──
    useEffect(() => {
        if (!playerId || !selfId || !signaling) return;

        if (isMock) {
            queueMicrotask(() => setLoading(false));
            return;
        }

        const provider = webrtcConfig?.provider || 'websocket';
        const iceServers = webrtcConfig?.iceServers || DEFAULT_RTC_CONFIG.iceServers;

        if (provider === 'cloudflare-sfu' && subscribeFromCF) {
            const unsubSignal = signaling.onMessage(async (msg: unknown) => {
                const castedMsg = msg as { type: string, sourceId: string | number, sessionId: string, trackName: string };
                if (castedMsg.type === 'cf-track-ready' && String(castedMsg.sourceId) === String(playerId)) {
                    try {
                        const { pc, stream } = await subscribeFromCF(castedMsg.sessionId, castedMsg.trackName);
                        peerRef.current = pc;
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.play().catch(() => { });
                            setLoading(false);
                        }
                    } catch {
                        setError(getLabel('error_desc', 'CF SFU subscribe failed'));
                    }
                }
            });

            onSendNui?.('GetPlayerScreen', { targetId: playerId });
            return () => {
                unsubSignal();
                if (peerRef.current) peerRef.current.close();
                onSendNui?.('StopPlayerScreen', { targetId: playerId });
            };
        }

        // P2P Path
        const unsub = signaling.onMessage(async (msg: unknown) => {
            const castedMsg = msg as { type: string, sourceId: string | number, data: unknown };
            if (castedMsg.type === 'offer' && String(castedMsg.sourceId) === String(playerId)) {
                const pc = new RTCPeerConnection({ iceServers }) as RTCPeerConnection & { _queue: RTCIceCandidateInit[] };
                peerRef.current = pc;
                pc._queue = [];

                pc.oniceconnectionstatechange = () => {
                    if ((pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') && onFpsUpdate) {
                        const statsId = setInterval(async () => {
                            if (!peerRef.current) { clearInterval(statsId); return; }
                            try {
                                const stats = await peerRef.current.getStats();
                                stats.forEach((report) => {
                                    if (report.type === 'inbound-rtp' && report.kind === 'video' && report.framesPerSecond !== undefined) {
                                        onFpsUpdate(Math.round(report.framesPerSecond));
                                    }
                                });
                            } catch { }
                        }, 1000);
                    }
                };

                pc.ontrack = (event) => {
                    const stream = event.streams[0];
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        setLoading(false);
                    }
                };

                await pc.setRemoteDescription(new RTCSessionDescription(castedMsg.data as RTCSessionDescriptionInit));
                while (pc._queue.length > 0) {
                    const candidate = pc._queue.shift();
                    if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
                }

                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                signaling.send({ type: 'answer', targetId: String(playerId), sourceId: 'viewer-' + selfId, data: answer });

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        signaling.send({ type: 'candidate', targetId: String(playerId), sourceId: 'viewer-' + selfId, data: event.candidate });
                    }
                };
            }
            if (castedMsg.type === 'candidate' && String(castedMsg.sourceId) === String(playerId)) {
                const pc = peerRef.current as (RTCPeerConnection & { _queue?: RTCIceCandidateInit[] }) | null;
                if (pc && pc.remoteDescription) {
                    await pc.addIceCandidate(new RTCIceCandidate(castedMsg.data as RTCIceCandidateInit));
                } else if (pc) {
                    if (!pc._queue) pc._queue = [];
                    pc._queue.push(castedMsg.data as RTCIceCandidateInit);
                }
            }
        });

        const trigger = () => onSendNui?.('GetPlayerScreen', { targetId: playerId });

        if (signaling.isConnected?.()) trigger();
        signaling.onConnect(trigger);

        return () => {
            unsub();
            if (peerRef.current) {
                peerRef.current.close();
                peerRef.current = null;
            }
            onSendNui?.('StopPlayerScreen', { targetId: playerId });
        };
    }, [playerId, selfId, onSendNui, webrtcConfig, isMock, onFpsUpdate, signaling, subscribeFromCF, getLabel]);

    // Attachment Watcher
    useEffect(() => {
        if (videoRef.current && streamRef.current && !videoRef.current.srcObject) {
            videoRef.current.srcObject = streamRef.current;
            videoRef.current.play().catch(() => { });
            queueMicrotask(() => setLoading(false));
        }
    }, []);

    return (
        <div className={cn("relative bg-black flex items-center justify-center overflow-hidden group rounded-xl border border-white/5 shadow-2xl", className)}>
            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground animate-in fade-in duration-500 z-10 bg-zinc-950/90 backdrop-blur-md">
                    <div className="relative">
                        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                        <MriSpinner size="lg" />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] animate-pulse">{getLabel('connecting', 'Connecting to feed...')}</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-red-400 z-10 bg-zinc-950/95 backdrop-blur-xl p-8 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                        <AlertCircle className="w-6 h-6 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-widest">{getLabel('error_title', 'Connection Failed')}</h4>
                        <p className="text-xs text-red-400/60 font-medium max-w-[200px] mx-auto leading-relaxed">{error}</p>
                    </div>
                    <MriButton variant="ghost" size="sm" className="mt-2 text-[10px] uppercase font-bold border border-white/5" onClick={() => window.location.reload()}>
                        {getLabel('retry', 'Retry')}
                    </MriButton>
                </div>
            )}

            {/* Main Content */}
            {isMock ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                    <div className="absolute inset-0 opacity-40 grayscale blur-[4px]">
                        <video
                            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative z-10 flex flex-col items-center gap-4 group/mock">
                        <div className="relative">
                            <MonitorIcon className="w-24 h-24 text-white opacity-10 group-hover/mock:opacity-20 transition-all duration-700 group-hover/mock:scale-110" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MonitorIcon className="w-12 h-12 text-primary opacity-40 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-3 z-10">
                        <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] text-white/80 border border-white/10 uppercase tracking-[0.15em] font-black flex items-center gap-2 shadow-2xl">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            {getLabel('mock_active', 'Mock Feed Active')} • ID: {playerId}
                        </div>
                        <div className="bg-primary/10 backdrop-blur-md text-primary text-[9px] px-3 py-1.5 rounded-lg border border-primary/20 uppercase tracking-[0.15em] font-black shadow-2xl">
                            {getLabel('simulator', 'Simulator')}
                        </div>
                    </div>

                    <div className="absolute top-6 left-6 flex items-center gap-2 z-10 animate-in slide-in-from-left duration-700">
                        <div className="flex items-center gap-1.5 bg-red-600 px-3 py-1 rounded font-black text-white text-[10px] tracking-widest uppercase shadow-lg shadow-red-600/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {getLabel('live', 'Live')}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain bg-black transition-opacity duration-1000"
                        autoPlay={autoPlay}
                        playsInline
                        muted={muted}
                        style={{ opacity: loading ? 0 : 1 }}
                    />

                    {!loading && !error && (
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded-sm font-black text-white text-[9px] tracking-widest uppercase shadow-lg shadow-red-600/30">
                                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                                {getLabel('live', 'Live')}
                            </div>
                            <div className="bg-black/60 backdrop-blur px-2 py-0.5 rounded-sm text-[9px] text-zinc-300 font-mono border border-white/10 flex items-center gap-1.5">
                                <Wifi size={10} className="text-green-500" />
                                {getLabel('stable', 'Stable')}
                            </div>
                        </div>
                    )}
                </>
            )}

            {showKeyboard && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[900px] px-4 pointer-events-none z-20 animate-in fade-in slide-in-from-bottom-6 duration-700 cubic-bezier(0.16, 1, 0.3, 1)">
                    <MriKeyboardVisualizer
                        pressedKeys={pressedKeys}
                        className="scale-[0.55] lg:scale-[0.65] origin-bottom shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto backdrop-blur-sm"
                    />
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] opacity-40" />
        </div>
    );
}
