import { format, Locale } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MriButton } from "@/components/atoms/MriButton";
import { MriCalendar } from "@/components/organisms/MriCalendar";
import {
    MriPopover,
    MriPopoverContent,
    MriPopoverTrigger,
} from "@/components/molecules/MriPopover";

interface MriDatePickerProps {
    value?: Date | null;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    locale?: Locale;
    size?: "default" | "sm";
    error?: boolean | string;
    fromDate?: Date;
    toDate?: Date;
}

export function MriDatePicker({ value, onChange, placeholder = "Selecione", disabled, locale = ptBR, size = "default", error, fromDate, toDate }: MriDatePickerProps) {
    return (
        <MriPopover>
            <MriPopoverTrigger asChild>
                <div className="w-full space-y-1">
                    <MriButton
                        variant="outline"
                        size={size}
                        className={cn(
                            "w-full justify-start pl-3 text-left font-normal",
                            !value && "text-muted-foreground",
                            error && "border-destructive focus:ring-destructive"
                        )}
                        disabled={disabled}
                    >
                        {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </MriButton>
                    {typeof error === "string" && (
                        <p className="text-[10px] font-medium text-destructive px-1 animate-in fade-in slide-in-from-top-1">
                            {error}
                        </p>
                    )}
                </div>
            </MriPopoverTrigger>
            <MriPopoverContent className="w-auto p-0" align="start">
                <MriCalendar
                    mode="single"
                    selected={value || undefined}
                    onSelect={onChange}
                    initialFocus
                    locale={locale}
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </MriPopoverContent>
        </MriPopover>
    );
}
