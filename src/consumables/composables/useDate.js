import { ref, computed } from 'vue'
import dayjs from 'dayjs'

export const useDate = (initialDate = null) => {
  const date = ref(initialDate ? dayjs(initialDate) : dayjs())

  const formatted = computed(() => date.value.format('YYYY-MM-DD'))
  const formattedTime = computed(() => date.value.format('HH:mm:ss'))
  const formattedDateTime = computed(() => date.value.format('YYYY-MM-DD HH:mm:ss'))
  const humanReadable = computed(() => date.value.format('MMM D, YYYY'))
  
  const setDate = (newDate) => {
    date.value = dayjs(newDate)
  }

  const addDays = (days) => {
    date.value = date.value.add(days, 'day')
  }

  const isBefore = (otherDate) => {
    return date.value.isBefore(dayjs(otherDate))
  }

  const isAfter = (otherDate) => {
    return date.value.isAfter(dayjs(otherDate))
  }

  return {
    date,
    formatted,
    formattedTime,
    formattedDateTime,
    humanReadable,
    setDate,
    addDays,
    isBefore,
    isAfter
  }
}

// Utility functions
export const dateUtils = {
  format: (date, format = 'YYYY-MM-DD') => dayjs(date).format(format),
  now: () => dayjs(),
  isValid: (date) => dayjs(date).isValid(),
  difference: (date1, date2, unit = 'day') => dayjs(date1).diff(dayjs(date2), unit)
}