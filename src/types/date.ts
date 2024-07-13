import type { LiteralUnion } from 'type-fest'

export interface DateType {
  monthDay: LiteralUnion<number, ''>
  day: number
  month: number
  year: number
}

export interface ViewOption {
  id: string
  name: string
}

export interface EventInfo {
  id: number
  name: string
  time: string
  datetime: string
  href: string
}

export interface DayInfo {
  isCurrentMonth: boolean
  isToday: boolean
  isWeekend: boolean
  format: {
    ddd: string
    dddd: string
    D: string
    DD: string
    LLLL: string
  }
  events: EventInfo[]
  isSelected: boolean
}

export interface MonthView {
  name: string
  days: DayInfo[]
}

export type YearView = MonthView[]
