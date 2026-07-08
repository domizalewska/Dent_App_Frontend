import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export function formatDateToString(date: Date | string, customFormat: string): string {
  if (!date) return 'Brak daty'
  return format(date, customFormat, { locale: pl })
}

export function formatMonthYear(year: number, month: number): string {
  return formatDateToString(new Date(year, month - 1), 'LLLL yyyy')
}

export function isCurrentMonth(year: number, month: number): boolean {
  const today = new Date()
  return year === today.getFullYear() && month === today.getMonth() + 1
}

export function getCurrentYearMonth(): { year: number; month: number } {
  const today = new Date()
  return { year: today.getFullYear(), month: today.getMonth() + 1 }
}
