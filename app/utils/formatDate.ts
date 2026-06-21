import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

export function formatDateToString(date: Date | string, customFormat: string): string {
  if (!date) return 'Brak daty'
  return format(date, customFormat, { locale: pl })
}

export function timestampToDate(ts: number): string {
  return new Date(ts * 1000).toISOString().slice(0, 10)
}

export function timestampToMidnight(ts: number): number {
  const d = new Date(ts * 1000)
  return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000)
}

export function dateTimeToTimestamp(date: string, time: string): number {
  return Math.floor(new Date(`${date}T${time}`).getTime() / 1000)
}

export function dateTimeToISO(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString()
}
