import type { ViewOption } from '#/types/date'
import { getDayNames, getMonthNames } from '#/utils/date'

export const DEFAULT_MONTHS = getMonthNames()

export const DEFAULT_DAYS = getDayNames()

export const VIEW_OPTIONS = [{
  id: 'day',
  name: 'Day',
}, {
  id: 'week',
  name: 'Week',
}, {
  id: 'month',
  name: 'Month',
}, {
  id: 'year',
  name: 'Year',
}] as const satisfies ViewOption[]
