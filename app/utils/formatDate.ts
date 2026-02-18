import { format } from 'date-fns'

export function formatDateToString(date: Date, customFormat: string): string {
  if (!date)
    return 'Brak daty'
  return format(date, customFormat)
}
