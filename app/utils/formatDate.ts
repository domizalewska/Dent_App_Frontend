import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export function formatDateToString(
  date: Date | string,
  customFormat: string = 'd MMM yyyy',
): string {
  if (!date) return 'Brak daty'
  return format(date, customFormat, { locale: pl })
}
