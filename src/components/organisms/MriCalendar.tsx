import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, addYears, setMonth, setYear, isBefore, isAfter, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns"
import { ptBR } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { mriButtonVariants } from "@/components/atoms/mri-button-variants"
import { MriButton } from "@/components/atoms/MriButton"
import { MriScrollArea } from "@/components/atoms/MriScrollArea"

export type MriCalendarProps = React.ComponentProps<typeof DayPicker> & {
    fromDate?: Date
    toDate?: Date
}

function MriCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: MriCalendarProps) {
  const [viewMode, setViewMode] = React.useState<'days' | 'months' | 'years'>('days')
  const [internalMonth, setInternalMonth] = React.useState<Date>(props.month || props.defaultMonth || new Date())

  // Sync internalMonth with props if they change
  React.useEffect(() => {
    if (props.month) {
        setInternalMonth(props.month)
    }
  }, [props.month])

  const handleMonthChange = (newMonth: Date) => {
    setInternalMonth(newMonth)
    if (props.onMonthChange) {
        props.onMonthChange(newMonth)
    }
  }

  const renderMonthPicker = () => {
    const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ]
    const currentYear = internalMonth.getFullYear()

    return (
      <div className="grid grid-cols-3 gap-2 p-3">
        {months.map((m, i) => {
          const date = setMonth(new Date(currentYear, 0, 1), i)
          const isSelected = internalMonth.getMonth() === i

          let isDisabled = false
          if (props.fromDate) {
             isDisabled = isBefore(endOfMonth(date), props.fromDate)
          }
          if (props.toDate) {
             isDisabled = isDisabled || isAfter(startOfMonth(date), props.toDate)
          }

          return (
            <MriButton
              key={m}
              variant="ghost"
              size="sm"
              disabled={isDisabled}
              className={cn(
                "h-9 font-normal justify-center",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
              onClick={() => {
                handleMonthChange(date)
                setViewMode('days')
              }}
            >
              {m}
            </MriButton>
          )
        })}
      </div>
    )
  }

  const renderYearPicker = () => {
    const currentYear = internalMonth.getFullYear()
    const startDecade = Math.floor(currentYear / 12) * 12
    const years = Array.from({ length: 12 }, (_, i) => startDecade + i)

    return (
      <MriScrollArea className="h-[200px] p-3">
        <div className="grid grid-cols-3 gap-2">
          {years.map((y) => {
            const date = setYear(internalMonth, y)
            const isSelected = currentYear === y

            let isDisabled = false
            if (props.fromDate) {
                isDisabled = isBefore(endOfYear(date), props.fromDate)
            }
            if (props.toDate) {
                isDisabled = isDisabled || isAfter(startOfYear(date), props.toDate)
            }

            return (
              <MriButton
                key={y}
                variant="ghost"
                size="sm"
                disabled={isDisabled}
                className={cn(
                  "h-9 font-normal justify-center",
                  isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => {
                  handleMonthChange(date)
                  setViewMode('months')
                }}
              >
                {y}
              </MriButton>
            )
          })}
        </div>
      </MriScrollArea>
    )
  }

  const customComponents = {
    CaptionLabel: () => (
      <MriButton
        variant="ghost"
        size="sm"
        className="h-7 font-medium px-2 py-0 hover:bg-accent hover:text-accent-foreground"
        onClick={() => {
          if (viewMode === 'days') setViewMode('months')
          else if (viewMode === 'months') setViewMode('years')
          else setViewMode('days')
        }}
      >
        {viewMode === 'years'
          ? `${Math.floor(internalMonth.getFullYear() / 12) * 12} - ${Math.floor(internalMonth.getFullYear() / 12) * 12 + 11}`
          : format(internalMonth, viewMode === 'months' ? "yyyy" : "MMMM yyyy", { locale: props.locale || ptBR })
        }
      </MriButton>
    ),
    IconLeft: () => <ChevronLeft className="h-4 w-4" />,
    IconRight: () => <ChevronRight className="h-4 w-4" />,
  }

  if (viewMode === 'months') {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex justify-between items-center mb-4 px-1">
           <customComponents.CaptionLabel />
           <div className="flex gap-1">
             <MriButton
               variant="outline"
               className="h-7 w-7 p-0"
               disabled={props.fromDate && internalMonth.getFullYear() <= props.fromDate.getFullYear()}
               onClick={() => handleMonthChange(addYears(internalMonth, -1))}
             >
               <ChevronLeft className="h-4 w-4" />
             </MriButton>
             <MriButton
               variant="outline"
               className="h-7 w-7 p-0"
               disabled={props.toDate && internalMonth.getFullYear() >= props.toDate.getFullYear()}
               onClick={() => handleMonthChange(addYears(internalMonth, 1))}
             >
               <ChevronRight className="h-4 w-4" />
             </MriButton>
           </div>
        </div>
        {renderMonthPicker()}
      </div>
    )
  }

  if (viewMode === 'years') {
    return (
      <div className={cn("p-3", className)}>
        <div className="flex justify-between items-center mb-4 px-1">
           <customComponents.CaptionLabel />
           <div className="flex gap-1">
             <MriButton
               variant="outline"
               className="h-7 w-7 p-0"
               onClick={() => handleMonthChange(addYears(internalMonth, -12))}
             >
               <ChevronLeft className="h-4 w-4" />
             </MriButton>
             <MriButton
               variant="outline"
               className="h-7 w-7 p-0"
               onClick={() => handleMonthChange(addYears(internalMonth, 12))}
             >
               <ChevronRight className="h-4 w-4" />
             </MriButton>
           </div>
        </div>
        {renderYearPicker()}
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      month={internalMonth}
      onMonthChange={handleMonthChange}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden", // Use custom caption component
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
        Caption: () => (
          <div className="flex justify-center pt-1 relative items-center">
             <customComponents.CaptionLabel />
             <div className="nav space-x-1 flex items-center absolute right-1">
                <MriButton
                  variant="outline"
                  className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  disabled={props.fromDate && isBefore(startOfMonth(internalMonth), props.fromDate)}
                  onClick={() => handleMonthChange(setMonth(internalMonth, internalMonth.getMonth() - 1))}
                  style={{ display: 'none' }} // react-day-picker nav is handled internally, but we use custom for months/years
                />
             </div>
          </div>
        ),
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
MriCalendar.displayName = "MriCalendar"

export { MriCalendar }
