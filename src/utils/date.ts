import type { DayInfo } from '#/types/date'

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

export function getDaysOfCurrentMonth() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      id: `${year}-${month}-${day}`,
      date: day,
      isWeekend: new Date(year, month, day).getDay() === 0,
      isCurrentWeek: day <= 7,
      format: {
        ddd: new Date(year, month, day).toLocaleString('default', { weekday: 'short' }),
        dddd: new Date(year, month, day).toLocaleString('default', { weekday: 'long' }),
        D: day.toString(),
        DD: day.toString().padStart(2, '0'),
        LLLL: new Date(year, month, day).toLocaleString('default', { month: 'long' }),
      },
      isToday: isSameDay(new Date(year, month, day), new Date()),
      isCurrentMonth: true,
      events: day === 10
        ? [
            { id: 1, name: 'Design review', time: '10AM', datetime: '2022-01-03T10:00', href: '#' },
            { id: 2, name: 'Sales meeting', time: '2PM', datetime: '2022-01-03T14:00', href: '#' },
          ]
        : [],
      isSelected: day === 10,
    })
  }

  return days
}

export function getDaysOfMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1)

  // Adjust the first day of the week to ensure the calendar starts with Monday
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7 // Shift Sunday (0) to the end of the week
  const startDate = new Date(year, month, 1 - firstDayOfWeek)

  const totalDays = 6 * 7 // 6 weeks * 7 days

  const calendarDays: DayInfo[] = []
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(startDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    date.setDate(startDate.getDate() + i)
    calendarDays.push({
      id: `${year}-${month}-${day}`,
      date: date.getDate(),
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
