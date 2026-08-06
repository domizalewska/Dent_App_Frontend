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

  function getDayNumber(day: DayOfWeek): number {
    const map: Record<DayOfWeek, number> = {
      [DayOfWeek.Sunday]: 0,
      [DayOfWeek.Monday]: 1,
      [DayOfWeek.Tuesday]: 2,
      [DayOfWeek.Wednesday]: 3,
      [DayOfWeek.Thursday]: 4,
      [DayOfWeek.Friday]: 5,
      [DayOfWeek.Saturday]: 6,
    }
    return map[day]
  }

  return { getDayLabel, getDayNumber }
}
