import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { MriButton } from "@/components/atoms/MriButton";
import {
    MriPopover,
    MriPopoverContent,
    MriPopoverTrigger,
} from "@/components/molecules/MriPopover";
import { MriScrollArea } from "@/components/atoms/MriScrollArea";

interface MriTimePickerProps {
    value?: string;
    onChange: (time: string) => void;
    disabled?: boolean;
    hourLabel?: string;
    minuteLabel?: string;
    size?: "default" | "sm";
    error?: boolean | string;
    minTime?: string; // Format "HH:mm"
    maxTime?: string; // Format "HH:mm"
}

const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES_OPTIONS = Array.from({ length: 60 }, (_, i) => i);

const parseTime = (time?: string): [number, number] => {
    if (!time) {
        return [0, 0];
    }

    const parts = time.split(":");
    if (parts.length !== 2) {
        return [0, 0];
    }

    const [hourStr, minuteStr] = parts;
    const hour = Number(hourStr);
    const minute = Number(minuteStr);

    if (
        !Number.isFinite(hour) ||
        !Number.isFinite(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
    ) {
        return [0, 0];
    }

    return [hour, minute];
};

export function MriTimePicker({ value, onChange, disabled, hourLabel = "Hora", minuteLabel = "Minuto", size = "default", error, minTime, maxTime }: MriTimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const [hours, minutes] = parseTime(value);
    const [minH, minM] = parseTime(minTime);
    const [maxH, maxM] = maxTime ? parseTime(maxTime) : [23, 59];

    const hoursOptions = HOURS_OPTIONS.map(h => ({
        value: h,
        disabled: h < minH || h > maxH
    }));

    const minutesOptions = MINUTES_OPTIONS.map(m => {
        let isDisabled = false;
        if (hours === minH && m < minM) isDisabled = true;
        if (hours === maxH && m > maxM) isDisabled = true;
        return { value: m, disabled: isDisabled };
    });

    const handleTimeChange = (type: "hour" | "minute", newVal: number) => {
        let newH = hours;
        let newM = minutes;

        if (type === "hour") {
            newH = newVal;
            // Adjust minutes if they become invalid for the new hour
            if (newH === minH && newM < minM) newM = minM;
            if (newH === maxH && newM > maxM) newM = maxM;
        }
        if (type === "minute") newM = newVal;

        const formattedH = newH.toString().padStart(2, "0");
        const formattedM = newM.toString().padStart(2, "0");

        onChange(`${formattedH}:${formattedM}`);
    };

    return (
        <MriPopover open={isOpen} onOpenChange={setIsOpen}>
            <MriPopoverTrigger asChild>
                <div className="w-full space-y-1">
                    <MriButton
                        variant="outline"
                        size={size}
                        className={cn(
                            "w-full min-w-[120px] justify-start pl-3 text-left font-normal",
                            !value && "text-muted-foreground",
                            error && "border-destructive focus:ring-destructive"
                        )}
                        disabled={disabled}
                    >
                        <div className="flex items-center w-full gap-2">
                            <span>{value || "00:00"}</span>
                            <Clock className="ml-auto h-4 w-4 opacity-50" />
                        </div>
                    </MriButton>
                    {typeof error === "string" && (
                        <p className="text-[10px] font-medium text-destructive px-1 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </p>
                    )}
                </div>
            </MriPopoverTrigger>
            <MriPopoverContent className="w-auto p-0 bg-card border-border" align="start">
                <div className="flex h-[300px] divide-x divide-border">
                    {/* Hours Column */}
                    <div className="flex flex-col">
                        <div className="p-2 text-center font-medium bg-muted/50 text-xs">{hourLabel}</div>
                        <MriScrollArea className="h-full w-[80px]">
                            <div className="p-2 space-y-1">
                                {hoursOptions.map(({ value: h, disabled: isDisabled }) => (
                                    <MriButton
                                        key={h}
                                        variant="ghost"
                                        size="sm"
                                        disabled={isDisabled}
                                        className={cn(
                                            "w-full justify-center text-sm font-normal",
                                            hours === h ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => handleTimeChange("hour", h)}
                                    >
                                        {h.toString().padStart(2, "0")}
                                    </MriButton>
                                ))}
                            </div>
                        </MriScrollArea>
                    </div>

                    {/* Minutes Column */}
                    <div className="flex flex-col">
                        <div className="p-2 text-center font-medium bg-muted/50 text-xs">{minuteLabel}</div>
                        <MriScrollArea className="h-full w-[80px]">
                            <div className="p-2 space-y-1">
                                {minutesOptions.map(({ value: m, disabled: isDisabled }) => (
                                    <MriButton
                                        key={m}
                                        variant="ghost"
                                        size="sm"
                                        disabled={isDisabled}
                                        className={cn(
                                            "w-full justify-center text-sm font-normal",
                                            minutes === m ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => handleTimeChange("minute", m)}
                                    >
                                        {m.toString().padStart(2, "0")}
                                    </MriButton>
                                ))}
                            </div>
                        </MriScrollArea>
                    </div>
                </div>
            </MriPopoverContent>
        </MriPopover>
    );
}
