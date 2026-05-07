import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export function formatDateToString(date: Date, customFormat: string): string {
  if (!date) return 'Brak daty'
  return format(date, customFormat, { locale: pl })
}
