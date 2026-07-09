import { AppointmentStatus } from '~/types'

export function useAppointmentStatusMeta() {
  const labels: Record<AppointmentStatus, string> = {
    [AppointmentStatus.CONFIRMED]: 'Potwierdzona',
    [AppointmentStatus.IN_PROGRESS]: 'W trakcie',
    [AppointmentStatus.PENDING]: 'Oczekuje',
  }

  const badgeStyles: Record<AppointmentStatus, string> = {
    [AppointmentStatus.CONFIRMED]: 'bg-emerald-500/20 text-emerald-400',
    [AppointmentStatus.IN_PROGRESS]: 'bg-blue-500/20 text-blue-400',
    [AppointmentStatus.PENDING]: 'bg-amber-500/20 text-amber-400',
  }

  const borderColor: Record<AppointmentStatus, string> = {
    [AppointmentStatus.CONFIRMED]: '#10b981',
    [AppointmentStatus.IN_PROGRESS]: '#3b82f6',
    [AppointmentStatus.PENDING]: '#f59e0b',
  }

  const bgClass: Record<AppointmentStatus, string> = {
    [AppointmentStatus.CONFIRMED]: 'bg-emerald-500/10',
    [AppointmentStatus.IN_PROGRESS]: 'bg-blue-500/10',
    [AppointmentStatus.PENDING]: 'bg-amber-500/10',
  }

  return { labels, badgeStyles, borderColor, bgClass }
}
