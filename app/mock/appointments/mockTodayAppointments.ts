import { mockScheduleDoctors } from '~/mock/schedule-doctors/mockScheduleDoctors'
import type { AppointmentType } from '~/types'

export const mockTodayAppointments: AppointmentType[] = Object.values(
  mockScheduleDoctors.appointments_by_doctor,
).flat()
