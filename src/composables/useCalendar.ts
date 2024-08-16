import { DEFAULT_MONTHS } from '#/constants/date'
import type { ViewOption } from '#/types/date'
import { getDaysOfMonth, getDaysOfWeek } from '#/utils/date'

type DateFormat = 'MMMM DD, YYYY' | 'MMMM YYYY' | 'YYYY'

const useCalendar = createGlobalState(() => {
  const dateObj = ref(new Date())

  const formater = (format: DateFormat) => {
    return useDateFormat(dateObj.value, format).value
  }

  const nextDate = (type: ViewOption['id']) => {
    const newDate = new Date(dateObj.value)

    switch (type) {
      case 'month':
        newDate.setMonth(dateObj.value.getMonth() + 1)
        break
      case 'year':
        newDate.setFullYear(dateObj.value.getFullYear() + 1)
        break
      case 'day':
        newDate.setDate(dateObj.value.getDate() + 1)
        break
      case 'week':
        newDate.setDate(dateObj.value.getDate() + 7)
        break
    }

    dateObj.value = newDate
  }

  const prevDate = (type: ViewOption['id']) => {
    const newDate = new Date(dateObj.value)

    switch (type) {
      case 'month':
        newDate.setMonth(dateObj.value.getMonth() - 1)
        break
      case 'year':
        newDate.setFullYear(dateObj.value.getFullYear() - 1)
        break
      case 'day':
        newDate.setDate(dateObj.value.getDate() - 1)
        break
      case 'week':
        newDate.setDate(dateObj.value.getDate() - 7)
        break
    }

    dateObj.value = newDate
  }

  const resetToToday = () => {
    const newDate = new Date()
    dateObj.value = newDate
  }

  const monthsOfYear = computed(() => {
    return DEFAULT_MONTHS.map((month) => {
      return {
        ...month,
        days: getDaysOfMonth(dateObj.value.getFullYear(), month.id),
      }
    })
  })

  const daysOfMonth = computed(() => {
    return getDaysOfMonth(dateObj.value.getFullYear(), dateObj.value.getMonth())
  })

  const daysOfTwoMonth = computed(() => {
    const year = dateObj.value.getFullYear()
    const month = dateObj.value.getMonth()
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    return Array.from({ length: 2 }).map((_, index) => {
      const monthInfo = DEFAULT_MONTHS[index === 0 ? month : nextMonth]
      return {
        ...monthInfo,
        days: getDaysOfMonth(index === 0 ? year : nextYear, index === 0 ? month : nextMonth),
      }
    })
  })

  const daysOfWeek = computed(() => {
    const year = dateObj.value.getFullYear()
    const month = dateObj.value.getMonth()
    const day = dateObj.value.getDate()
    return getDaysOfWeek(year, month, day)
  })

  return {
    formater,
    nextDate,
    prevDate,
    resetToToday,
    dateObj,
    monthsOfYear,
    daysOfMonth,
    daysOfWeek,
    daysOfTwoMonth,
  }
})

export default useCalendar
