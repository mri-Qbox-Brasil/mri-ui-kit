import type { CSSProperties } from 'react'
import { cn } from '../../lib/utils'

export interface MriKeyboardVisualizerProps {
    pressedKeys: string[]
    className?: string
}

interface KeyProps {
    label: string
    code?: string
    className?: string
    style?: CSSProperties
    active: boolean
}

const Key = ({ label, className: keyClass, style, active }: KeyProps) => {
    return (
        <div
            style={style}
            className={cn(
                "h-8 flex items-center justify-center rounded-md border text-[10px] font-bold transition-all duration-100 select-none shrink-0 shadow-sm",
                active
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] scale-90 z-10"
                    : "bg-black/40 text-white/70 border-white/20 backdrop-blur-md",
                keyClass
            )}
        >
            {label}
        </div>
    )
}

export const MriKeyboardVisualizer = ({ pressedKeys, className }: MriKeyboardVisualizerProps) => {
    const isPressed = (label: string) => pressedKeys.includes(label.toUpperCase())

    const renderKey = (label: string, code?: string, keyClass?: string, style?: CSSProperties) => (
        <Key
            label={label}
            active={isPressed(code || label)}
            className={keyClass}
            style={style}
        />
    )

    return (
        <div className={cn("p-4 bg-black/40 backdrop-blur-3xl rounded-3xl border border-white/10 flex gap-6 w-fit mx-auto shadow-2xl overflow-hidden", className)}>
            {/* 1. Main Keyboard (Alphanumeric) */}
            <div className="flex flex-col gap-1.5 w-[480px] shrink-0">
                {/* Row 1: Function Keys */}
                <div className="flex gap-1.5 mb-1">
                    {renderKey("ESC", undefined, "w-10 mr-4")}
                    <div className="flex gap-1">
                        {renderKey("F1", undefined, "w-9")}
                        {renderKey("F2", undefined, "w-9")}
                        {renderKey("F3", undefined, "w-9")}
                        {renderKey("F4", undefined, "w-9")}
                    </div>
                    <div className="w-2" />
                    <div className="flex gap-1">
                        {renderKey("F5", undefined, "w-9")}
                        {renderKey("F6", undefined, "w-9")}
                        {renderKey("F7", undefined, "w-9")}
                        {renderKey("F8", undefined, "w-9")}
                    </div>
                    <div className="w-2" />
                    <div className="flex gap-1">
                        {renderKey("F9", undefined, "w-9")}
                        {renderKey("F10", undefined, "w-9")}
                        {renderKey("F11", undefined, "w-9")}
                        {renderKey("F12", undefined, "w-9")}
                    </div>
                </div>

                {/* Row 2: Numbers */}
                <div className="flex gap-1">
                    {renderKey("~", undefined, "w-8")}
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="].map(k => (
                        <Key key={k} label={k} active={isPressed(k)} className="flex-1" />
                    ))}
                    {renderKey("BACK", undefined, "w-16")}
                </div>

                {/* Row 3: TAB */}
                <div className="flex gap-1">
                    {renderKey("TAB", undefined, "w-14")}
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map(k => (
                        <Key key={k} label={k} active={isPressed(k)} className="flex-1" />
                    ))}
                </div>

                {/* Row 4: CAPS */}
                <div className="flex gap-1">
                    {renderKey("CAPS", undefined, "w-16")}
                    {["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"].map(k => (
                        <Key key={k} label={k} active={isPressed(k)} className="flex-1" />
                    ))}
                    {renderKey("ENTER", undefined, "w-24")}
                </div>

                {/* Row 5: SHIFT */}
                <div className="flex gap-1">
                    {renderKey("SHIFT", undefined, "w-24")}
                    {["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"].map(k => (
                        <Key key={k} label={k} active={isPressed(k)} className="flex-1" />
                    ))}
                    {renderKey("SHIFT", undefined, "w-28")}
                </div>

                {/* Row 6: Bottom Row */}
                <div className="flex gap-1">
                    {renderKey("CTRL", undefined, "w-14")}
                    {renderKey("WIN", undefined, "w-14")}
                    {renderKey("ALT", undefined, "w-14")}
                    {renderKey("SPACE", undefined, "flex-[6] h-8")}
                    {renderKey("ALT", undefined, "w-14")}
                    {renderKey("WIN", undefined, "w-14")}
                    {renderKey("CTRL", undefined, "w-14")}
                </div>
            </div>

            {/* 2. Navigation & Arrows Section */}
            <div className="flex flex-col gap-6 shrink-0">
                <div className="h-9 mb-1 invisible" /> {/* Placeholder para alinhamento com linha de funções */}
                <div className="grid grid-cols-3 gap-1 w-[124px]">
                    {["INS", "HM", "PU"].map(k => {
                        const code = k === "HM" ? "HOME" : k === "PU" ? "PGUP" : k;
                        return <Key key={k} label={k} active={isPressed(code)} className="h-8" />
                    })}
                    {["DEL", "END", "PD"].map(k => {
                        const code = k === "PD" ? "PGDN" : k;
                        return <Key key={k} label={k} active={isPressed(code)} className="h-8" />
                    })}
                </div>

                <div className="grid grid-cols-3 gap-1 w-[124px] mt-auto">
                    <div />
                    {renderKey("UP", "UP", "h-8")}
                    <div />
                    {renderKey("LFT", "LEFT", "h-8")}
                    {renderKey("DWN", "DOWN", "h-8")}
                    {renderKey("RGT", "RIGHT", "h-8")}
                </div>
            </div>

            {/* 3. Numpad Section */}
            <div className="flex flex-col gap-1 w-[130px] shrink-0">
                <div className="h-9 mb-1 invisible" /> {/* Align with function row */}
                <div className="flex gap-1">
                    {renderKey("NM", "NUM", "w-8")}
                    {renderKey("/", "NUM /", "w-8")}
                    {renderKey("*", "NUM *", "w-8")}
                    {renderKey("-", "NUM -", "w-8")}
                </div>
                <div className="flex gap-1">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            {renderKey("7", "NUM 7", "w-8")}
                            {renderKey("8", "NUM 8", "w-8")}
                            {renderKey("9", "NUM 9", "w-8")}
                        </div>
                        <div className="flex gap-1">
                            {renderKey("4", "NUM 4", "w-8")}
                            {renderKey("5", "NUM 5", "w-8")}
                            {renderKey("6", "NUM 6", "w-8")}
                        </div>
                    </div>
                    {renderKey("+", "NUM +", "w-8 h-[68px]")}
                </div>
                <div className="flex gap-1">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            {renderKey("1", "NUM 1", "w-8")}
                            {renderKey("2", "NUM 2", "w-8")}
                            {renderKey("3", "NUM 3", "w-8")}
                        </div>
                        <div className="flex gap-1">
                            {renderKey("0", "NUM 0", "w-[40px]")}
                            {renderKey(".", "NUM .", "w-8")}
                        </div>
                    </div>
                    {renderKey("EN", "NUM ENTER", "w-8 h-[68px]")}
                </div>
            </div>

            {/* 4. Mouse Section */}
            <div className="flex flex-col gap-2 w-24">
                <div className="h-32 border border-white/10 rounded-t-[2.5rem] flex relative overflow-hidden bg-black/20">
                    <div className={cn(
                        "flex-1 border-r border-white/10 transition-all duration-100",
                        isPressed('LMB') ? "bg-primary/80 shadow-[inset_0_0_20px_rgba(var(--primary),0.4)]" : "bg-transparent"
                    )} />
                    <div className={cn(
                        "flex-1 transition-all duration-100",
                        isPressed('RMB') ? "bg-primary/80 shadow-[inset_0_0_20px_rgba(var(--primary),0.4)]" : "bg-transparent"
                    )} />
                    {/* Scroll wheel */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-4 h-12 rounded-full border border-white/10 bg-black/40 shadow-inner" />
                </div>
                <div className="h-20 border border-white/10 rounded-b-[2.5rem] bg-black/20" />
            </div>
        </div>
    )
}
