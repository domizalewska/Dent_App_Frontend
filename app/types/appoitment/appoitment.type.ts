export type AppointmentDoctor = {
  uuid: string
  first_name: string
  last_name: string
  specialization: string
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled'

export type AppointmentType = {
  uuid: string
  patient_uuid: string
  patient_name?: string
  doctor: AppointmentDoctor
  name: string
  description: string
  date: Date | string
  duration_minutes: number
  status: AppointmentStatus
  room?: string
}

export type AppointmentPayload = Omit<AppointmentType, 'uuid' | 'doctor' | 'patient_name' | 'room'>
