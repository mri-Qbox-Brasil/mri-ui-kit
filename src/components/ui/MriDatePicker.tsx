import { format, Locale } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MriButton } from "@/components/ui/MriButton";
import { MriCalendar } from "@/components/ui/MriCalendar";
import {
    MriPopover,
    MriPopoverContent,
    MriPopoverTrigger,
} from "@/components/ui/MriPopover";

interface MriDatePickerProps {
    value?: Date | null;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    locale?: Locale;
}

export function MriDatePicker({ value, onChange, placeholder = "Selecione", disabled, locale = ptBR }: MriDatePickerProps) {
    return (
        <MriPopover>
            <MriPopoverTrigger asChild>
                <MriButton
                    variant="outline"
                    className={cn(
                        "w-full justify-start pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                >
                    {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </MriButton>
            </MriPopoverTrigger>
            <MriPopoverContent className="w-auto p-0" align="start">
                <MriCalendar
                    mode="single"
                    selected={value || undefined}
                    onSelect={onChange}
                    initialFocus
                    locale={locale}
                />
            </MriPopoverContent>
        </MriPopover>
    );
}
