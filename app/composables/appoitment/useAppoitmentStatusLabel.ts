import type { AppointmentStatus } from '~/types'

export const getLabelFormStatus = (appoitment: AppointmentStatus): string => {
  switch (appoitment) {
    case 'cancelled':
      return 'Anulowana'
    case 'completed':
      return 'Zakończona'
    case 'scheduled':
      return 'Zaplanowana'
    default:
      return ''
  }
}
