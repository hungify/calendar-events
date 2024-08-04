import type { DayInfo } from '#/types/date'

export function getDayNames(locale = 'en-US') {
  const formatterShort = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const formatterLong = new Intl.DateTimeFormat(locale, { weekday: 'long' })
  const formatterNarrow = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })

  return Array.from({ length: 7 }, (_, id) => {
    const date = new Date(Date.UTC(2021, 0, id + 4)) // 2021-01-04 is a Monday
    return {
      id,
      short: formatterShort.format(date),
      long: formatterLong.format(date),
      narrow: formatterNarrow.format(date),
    }
  })
}

export function getMonthNames(locale = 'en-US') {
  const formatterLong = new Intl.DateTimeFormat(locale, { month: 'long' })
  const formatterShort = new Intl.DateTimeFormat(locale, { month: 'short' })
  const formatterNarrow = new Intl.DateTimeFormat(locale, { month: 'narrow' })

  return Array.from({ length: 12 }, (_, id) => {
    const date = new Date(Date.UTC(2021, id, 1))
    return {
      id,
      long: formatterLong.format(date),
      short: formatterShort.format(date),
      narrow: formatterNarrow.format(date),
    }
  })
}

export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear()
  )
}

export function isDateInRange(dateToCheck: Date, startDate: Date, endDate: Date): boolean {
  const checkTime = dateToCheck.getTime()
  const startTime = startDate.getTime()
  const endTime = endDate.getTime()

  return checkTime >= startTime && checkTime <= endTime
}

export function isDateBefore(startDate: Date, endDate: Date): boolean {
  return startDate.getTime() < endDate.getTime()
}

export function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1)

  // Adjust the first day of the week to ensure the calendar starts with Monday
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7 // Shift Sunday (0) to the end of the week
  const startDate = new Date(year, month, 1 - firstDayOfWeek)

  const totalDays = 6 * 7 // 6 weeks * 7 days

  const calendarDays: DayInfo[] = []
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    calendarDays.push({
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isCurrentWeek: i < 7,
      format: {
        ddd: date.toLocaleString('default', { weekday: 'short' }),
        dddd: date.toLocaleString('default', { weekday: 'long' }),
        D: date.getDate().toString(),
        DD: date.getDate().toString().padStart(2, '0'),
        LLLL: date.toLocaleString('default', { month: 'long' }),
      },
      isToday: isSameDay(date, new Date()),
      isCurrentMonth: date.getMonth() === month,
      events: i === 10
        ? [
            { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
            { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
          ]
        : [],
      isSelected: i === 10,
    })
  }

  return calendarDays
}

export function getYearMonths(year: number) {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(year, i, 1)
    return {
      format: {
        MM: (i + 1).toString().padStart(2, '0'),
        MMM: date.toLocaleString('default', { month: 'short' }),
        MMMM: date.toLocaleString('default', { month: 'long' }),
      },
      days: getMonthDays(year, i),
    }
  })
}

export function getTimeSlots(locale = 'en-US', step = 60) {
  const formatterLT = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  const timeSlots = []

  for (let hour = 0; hour < 24; hour += step / 60) {
    for (let minute = 0; minute < 60; minute += step) {
      if (minute > 0 && step > 60)
        continue
      const date = new Date()
      date.setHours(hour, minute, 0, 0)

      const ampm = date.getHours() < 12 ? 'AM' : 'PM'
      const formattedHour = formatterLT.format(date)

      const hAFormat = `${formattedHour.split(':')[0]} ${ampm}`
      timeSlots.push({
        '12-hour': formatterLT.format(date),
        'hA': hAFormat,
      })
    }
  }

  return timeSlots
}
