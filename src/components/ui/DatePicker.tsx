import { format, Locale } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";

interface DatePickerProps {
    value?: Date | null;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    locale?: Locale;
}

export function DatePicker({ value, onChange, placeholder = "Selecione", disabled, locale = ptBR }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                    disabled={disabled}
                >
                    {value ? format(value, "dd/MM/yyyy") : <span>{placeholder}</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value || undefined}
                    onSelect={onChange}
                    initialFocus
                    locale={locale}
                />
            </PopoverContent>
        </Popover>
    );
}
