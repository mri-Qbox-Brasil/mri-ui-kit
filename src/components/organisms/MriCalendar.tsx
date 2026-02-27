import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, addYears, setMonth, setYear } from "date-fns"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { mriButtonVariants } from "@/components/atoms/mri-button-variants"

export type MriCalendarProps = React.ComponentProps<typeof DayPicker>

function MriCalendar({
  className,
  classNames,
  showOutsideDays = true,
  month,
  onMonthChange,
  ...props
}: MriCalendarProps) {
  const [view, setView] = React.useState<"days" | "months" | "years">("days")
  const [internalMonth, setInternalMonth] = React.useState<Date>(() => {
    if (month) return month
    if (props.defaultMonth) return props.defaultMonth
    if (props.selected instanceof Date) return props.selected
    return new Date()
  })

  // Keep internal month synced if controlled month changes
  React.useEffect(() => {
    if (month) {
      setInternalMonth(month)
    }
  }, [month])

  const displayMonth = month || internalMonth

  const handleMonthChange = (newMonth: Date) => {
    setInternalMonth(newMonth)
    onMonthChange?.(newMonth)
  }

  if (view === "months") {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex justify-between items-center pt-1 relative pb-4">
          <button
            onClick={() => handleMonthChange(addYears(displayMonth, -1))}
            className={cn(
              mriButtonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            className={cn(
              mriButtonVariants({ variant: "ghost" }),
              "h-7 px-2 text-sm font-medium mx-auto"
            )}
            onClick={() => setView("years")}
          >
            {format(displayMonth, "yyyy")}
          </button>

          <button
            onClick={() => handleMonthChange(addYears(displayMonth, 1))}
            className={cn(
              mriButtonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {Array.from({ length: 12 }).map((_, i) => {
            const isSelected = displayMonth.getMonth() === i
            return (
              <button
                key={i}
                type="button"
                className={cn(
                  mriButtonVariants({ variant: isSelected ? "default" : "ghost" }),
                  "h-10 w-full font-normal"
                )}
                onClick={() => {
                  handleMonthChange(setMonth(displayMonth, i))
                  setView("days")
                }}
              >
                {format(new Date(2000, i, 1), "MMM", { locale: props.locale || ptBR })}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (view === "years") {
    const currentYear = displayMonth.getFullYear()
    const startYear = Math.floor(currentYear / 10) * 10
    const years = Array.from({ length: 12 }).map((_, i) => startYear - 1 + i)

    return (
      <div className={cn("p-3", className)}>
        <div className="flex justify-between items-center pt-1 relative pb-4">
          <button
            onClick={() => handleMonthChange(addYears(displayMonth, -10))}
            className={cn(
              mriButtonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className={cn(
            mriButtonVariants({ variant: "ghost" }),
            "h-7 px-2 text-sm font-medium mx-auto cursor-pointer pointer-events-none"
          )}>
            {years[0]} - {years[years.length - 1]}
          </div>

          <button
            onClick={() => handleMonthChange(addYears(displayMonth, 10))}
            className={cn(
              mriButtonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {years.map((y) => {
            const isSelected = displayMonth.getFullYear() === y
            return (
              <button
                key={y}
                type="button"
                className={cn(
                  mriButtonVariants({ variant: isSelected ? "default" : "ghost" }),
                  "h-10 w-full font-normal"
                )}
                onClick={() => {
                  handleMonthChange(setYear(displayMonth, y))
                  setView("months")
                }}
              >
                {y}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={displayMonth}
      onMonthChange={handleMonthChange}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          mriButtonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          mriButtonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        CaptionLabel: () => {
          return (
            <button
              type="button"
              className={cn(
                mriButtonVariants({ variant: "ghost" }),
                "h-7 px-2 text-sm font-medium z-10"
              )}
              onClick={() => setView("months")}
            >
              {format(displayMonth, "MMMM yyyy", { locale: props.locale || ptBR })}
            </button>
          )
        },
        ...props.components,
      }}
      {...props}
    />
  )
}
MriCalendar.displayName = "MriCalendar"

export { MriCalendar }
