import { DayOfWeek } from '~/types'

export function useDayOfWeek() {
  function getDayLabel(day: DayOfWeek): string {
    switch (day) {
      case DayOfWeek.Monday:
        return 'Poniedziałek'
      case DayOfWeek.Tuesday:
        return 'Wtorek'
      case DayOfWeek.Wednesday:
        return 'Środa'
      case DayOfWeek.Thursday:
        return 'Czwartek'
      case DayOfWeek.Friday:
        return 'Piątek'
      case DayOfWeek.Saturday:
        return 'Sobota'
      case DayOfWeek.Sunday:
        return 'Niedziela'
    }
  }

  return { getDayLabel }
}
