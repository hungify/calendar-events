import { capitalize } from 'vue'
import { objectKeys } from '#/utils/object'

export const DEFAULT_MONTHS = [
  {
    id: 0,
    long: 'January',
    short: 'Jan',
    narrow: 'J',
  },
  {
    id: 1,
    long: 'February',
    short: 'Feb',
    narrow: 'F',
  },
  {
    id: 2,
    long: 'March',
    short: 'Mar',
    narrow: 'M',
  },
  {
    id: 3,
    long: 'April',
    short: 'Apr',
    narrow: 'A',
  },
  {
    id: 4,
    long: 'May',
    short: 'May',
    narrow: 'M',
  },
  {
    id: 5,
    long: 'June',
    short: 'Jun',
    narrow: 'J',
  },
  {
    id: 6,
    long: 'July',
    short: 'Jul',
    narrow: 'J',
  },
  {
    id: 7,
    long: 'August',
    short: 'Aug',
    narrow: 'A',
  },
  {
    id: 8,
    long: 'September',
    short: 'Sep',
    narrow: 'S',
  },
  {
    id: 9,
    long: 'October',
    short: 'Oct',
    narrow: 'O',
  },
  {
    id: 10,
    long: 'November',
    short: 'Nov',
    narrow: 'N',
  },
  {
    id: 11,
    long: 'December',
    short: 'Dec',
    narrow: 'D',
  },
] as const

export const DEFAULT_DAYS = [
  {
    id: 0,
    short: 'Mon',
    long: 'Monday',
    narrow: 'M',
  },
  {
    id: 1,
    short: 'Tue',
    long: 'Tuesday',
    narrow: 'T',
  },
  {
    id: 2,
    short: 'Wed',
    long: 'Wednesday',
    narrow: 'W',
  },
  {
    id: 3,
    short: 'Thu',
    long: 'Thursday',
    narrow: 'T',
  },
  {
    id: 4,
    short: 'Fri',
    long: 'Friday',
    narrow: 'F',
  },
  {
    id: 5,
    short: 'Sat',
    long: 'Saturday',
    narrow: 'S',
  },
  {
    id: 6,
    short: 'Sun',
    long: 'Sunday',
    narrow: 'S',
  },
] as const

export const VIEWS = {
  day: 'day',
  week: 'week',
  month: 'month',
  year: 'year',
  double: 'double',
} as const

export const VIEW_OPTIONS = objectKeys(VIEWS).map((key) => {
  const value = VIEWS[key]
  return {
    id: key,
    name: capitalize(value),
  }
})

export const TIME_SLOTS = [
  {
    '12-hour': '12:00 AM',
    'hA': '12 AM',
  },
  {
    '12-hour': '1:00 AM',
    'hA': '1 AM',
  },
  {
    '12-hour': '2:00 AM',
    'hA': '2 AM',
  },
  {
    '12-hour': '3:00 AM',
    'hA': '3 AM',
  },
  {
    '12-hour': '4:00 AM',
    'hA': '4 AM',
  },
  {
    '12-hour': '5:00 AM',
    'hA': '5 AM',
  },
  {
    '12-hour': '6:00 AM',
    'hA': '6 AM',
  },
  {
    '12-hour': '7:00 AM',
    'hA': '7 AM',
  },
  {
    '12-hour': '8:00 AM',
    'hA': '8 AM',
  },
  {
    '12-hour': '9:00 AM',
    'hA': '9 AM',
  },
  {
    '12-hour': '10:00 AM',
    'hA': '10 AM',
  },
  {
    '12-hour': '11:00 AM',
    'hA': '11 AM',
  },
  {
    '12-hour': '12:00 PM',
    'hA': '12 PM',
  },
  {
    '12-hour': '1:00 PM',
    'hA': '1 PM',
  },
  {
    '12-hour': '2:00 PM',
    'hA': '2 PM',
  },
  {
    '12-hour': '3:00 PM',
    'hA': '3 PM',
  },
  {
    '12-hour': '4:00 PM',
    'hA': '4 PM',
  },
  {
    '12-hour': '5:00 PM',
    'hA': '5 PM',
  },
  {
    '12-hour': '6:00 PM',
    'hA': '6 PM',
  },
  {
    '12-hour': '7:00 PM',
    'hA': '7 PM',
  },
  {
    '12-hour': '8:00 PM',
    'hA': '8 PM',
  },
  {
    '12-hour': '9:00 PM',
    'hA': '9 PM',
  },
  {
    '12-hour': '10:00 PM',
    'hA': '10 PM',
  },
  {
    '12-hour': '11:00 PM',
    'hA': '11 PM',
  },
] as const
