import type { DayInfo } from '#/types/date'

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear()
  )
}

export function getDaysOfMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1)

  // Adjust the first day of the week to ensure the calendar starts with Monday
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7 // Shift Sunday (0) to the end of the week
  const startDate = new Date(year, month, 1 - firstDayOfWeek)

  const totalDays = 6 * 7 // 6 weeks * 7 days

  const now = new Date()

  const calendarDays: DayInfo[] = []
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const startMonth = date.getMonth()
    const startDay = date.getDay()

    calendarDays.push({
      id: `${year}-${startMonth}-${date.getDate()}`,
      date: date.getDate(),
      isWeekend: startDay === 0 || startDay === 6,
      isCurrentWeek: i < 7,
      format: {
        ddd: date.toLocaleString('default', { weekday: 'short' }),
        dddd: date.toLocaleString('default', { weekday: 'long' }),
        D: date.getDate().toString(),
        DD: date.getDate().toString().padStart(2, '0'),
        LLLL: date.toLocaleString('default', { month: 'long' }),
      },
      isToday: isSameDay(date, new Date()),
      isCurrentMonth: startMonth === month,
      events: i === 10
        ? [
            { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
            { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
          ]
        : [],
      isSelected: i === 10,
      isPast: date < now,
    })
  }

  return calendarDays
}

export function getDaysOfWeek(year: number, month: number, date: number): DayInfo[] {
  const currentDate = new Date(year, month, date, 23, 59, 59)
  const dayOfWeek = currentDate.getDay() // 0 (Sunday) to 6 (Saturday)

  // Calculate the start and end dates of the current week
  const startDate = new Date(currentDate)
  startDate.setDate(currentDate.getDate() - dayOfWeek)

  const endDate = new Date(currentDate)
  endDate.setDate(currentDate.getDate() + (6 - dayOfWeek))

  const now = new Date()

  // Generate an array of dates for the current week
  const datesOfCurrentWeek: DayInfo[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const startMonth = date.getMonth()
    const startDay = date.getDay()

    datesOfCurrentWeek.push({
      id: `${year}-${month}-${date.getDate()}`,
      date: date.getDate(),
      isWeekend: startDay === 0 || startDay === 6,
      isCurrentWeek: true,
      events: i === 10
        ? [
            { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
            { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
          ]
        : [],
      isSelected: i === 10,
      isCurrentMonth: startMonth === month,
      isToday: isSameDay(date, new Date()),
      format: {
        ddd: date.toLocaleString('default', { weekday: 'short' }),
        dddd: date.toLocaleString('default', { weekday: 'long' }),
        D: date.getDate().toString(),
        DD: date.getDate().toString().padStart(2, '0'),
        LLLL: date.toLocaleString('default', { month: 'long' }),
      },
      isPast: date < now,
    })
  }

  return datesOfCurrentWeek
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
