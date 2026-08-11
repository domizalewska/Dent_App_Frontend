import { useLocalStorage } from '@vueuse/core'
import { CalendarType } from '~/types'

export const defaultScheduleColors: Record<CalendarType, string> = {
  [CalendarType.WORK]: '#6366f1',
  [CalendarType.VACATION]: '#f59e0b',
  [CalendarType.SICK_LEAVE]: '#ef4444',
  [CalendarType.EXAMINATION]: '#3b82f6',
  [CalendarType.OTHER]: '#6b7280',
}

export function useScheduleColors() {
  const colors = useLocalStorage<Record<CalendarType, string>>('schedule-event-colors', {
    ...defaultScheduleColors,
  })

  function getColor(type: CalendarType): string {
    return colors.value[type] ?? defaultScheduleColors[type]
  }

  function setColor(type: CalendarType, color: string) {
    colors.value = { ...colors.value, [type]: color }
  }

  function reset() {
    colors.value = { ...defaultScheduleColors }
  }

  return { colors, getColor, setColor, reset }
}
