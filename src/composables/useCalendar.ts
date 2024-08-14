import { DEFAULT_MONTHS } from '#/constants/date'
import { getDaysOfMonth, getDaysOfWeek } from '#/utils/date'

type DateFormat = 'MMMM DD, YYYY' | 'MMMM YYYY' | 'YYYY'

const useCalendar = createGlobalState(() => {
  const dateObj = ref(new Date())

  const formater = (format: DateFormat) => {
    return useDateFormat(dateObj.value, format).value
  }

  const nextDate = (type: 'month' | 'year' | 'day' | 'week') => {
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

  const prevDate = (type: 'month' | 'year' | 'day' | 'week') => {
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

  }
})

export default useCalendar
