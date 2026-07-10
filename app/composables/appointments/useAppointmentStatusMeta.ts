import { AppointmentStatus } from '~/types'

export const getLabelFromAppointmentStatus = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'Potwierdzona'
    case AppointmentStatus.IN_PROGRESS:
      return 'W trakcie'
    case AppointmentStatus.PENDING:
      return 'Oczekuje'
    default:
      return ''
  }
}

export const getBadgeClassFromAppointmentStatus = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'bg-emerald-500/20 text-emerald-400'
    case AppointmentStatus.IN_PROGRESS:
      return 'bg-blue-500/20 text-blue-400'
    case AppointmentStatus.PENDING:
      return 'bg-amber-500/20 text-amber-400'
    default:
      return ''
  }
}

export const getBorderClassFromAppointmentStatus = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'border-l-emerald-500'
    case AppointmentStatus.IN_PROGRESS:
      return 'border-l-blue-500'
    case AppointmentStatus.PENDING:
      return 'border-l-amber-500'
    default:
      return ''
  }
}

export const getBgClassFromAppointmentStatus = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'bg-emerald-500/10'
    case AppointmentStatus.IN_PROGRESS:
      return 'bg-blue-500/10'
    case AppointmentStatus.PENDING:
      return 'bg-amber-500/10'
    default:
      return ''
  }
}

export const getDotClassFromAppointmentStatus = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.CONFIRMED:
      return 'bg-emerald-500'
    case AppointmentStatus.IN_PROGRESS:
      return 'bg-blue-500'
    case AppointmentStatus.PENDING:
      return 'bg-amber-500'
    default:
      return ''
  }
}
