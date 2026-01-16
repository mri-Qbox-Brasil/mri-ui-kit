import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { ScrollArea } from "@/components/ui/ScrollArea";

interface TimePickerProps {
    value?: string;
    onChange: (time: string) => void;
    disabled?: boolean;
    hourLabel?: string;
    minuteLabel?: string;
}

export function TimePicker({ value, onChange, disabled, hourLabel = "Hora", minuteLabel = "Minuto" }: TimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

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
const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES_OPTIONS = Array.from({ length: 60 }, (_, i) => i);

export function TimePicker({ value, onChange, disabled, hourLabel = "Hora", minuteLabel = "Minuto" }: TimePickerProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const [hours, minutes] = (value || "00:00").split(":").map(Number);

    const hoursOptions = HOURS_OPTIONS;
    const minutesOptions = MINUTES_OPTIONS;

    const handleTimeChange = (type: "hour" | "minute", newVal: number) => {
        let newH = hours;
        let newM = minutes;

        if (type === "hour") newH = newVal;
        if (type === "minute") newM = newVal;

        const formattedH = newH.toString().padStart(2, "0");
        const formattedM = newM.toString().padStart(2, "0");

        onChange(`${formattedH}:${formattedM}`);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full min-w-[120px] justify-start pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                >
                    <div className="flex items-center w-full gap-2">
                        <span>{value || "00:00"}</span>
                        <Clock className="ml-auto h-4 w-4 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                <div className="flex h-[300px] divide-x divide-border">
                    {/* Hours Column */}
                    <div className="flex flex-col">
                        <div className="p-2 text-center font-medium bg-muted/50 text-xs">{hourLabel}</div>
                        <ScrollArea className="h-full w-[80px]">
                            <div className="p-2 space-y-1">
                                {hoursOptions.map((h) => (
                                    <Button
                                        key={h}
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "w-full justify-center text-sm",
                                            hours === h ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => handleTimeChange("hour", h)}
                                    >
                                        {h.toString().padStart(2, "0")}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Minutes Column */}
                    <div className="flex flex-col">
                        <div className="p-2 text-center font-medium bg-muted/50 text-xs">{minuteLabel}</div>
                        <ScrollArea className="h-full w-[80px]">
                            <div className="p-2 space-y-1">
                                {minutesOptions.map((m) => (
                                    <Button
                                        key={m}
                                        variant="ghost"
                                        size="sm"
                                        className={cn(
                                            "w-full justify-center text-sm",
                                            minutes === m ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        onClick={() => handleTimeChange("minute", m)}
                                    >
                                        {m.toString().padStart(2, "0")}
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
