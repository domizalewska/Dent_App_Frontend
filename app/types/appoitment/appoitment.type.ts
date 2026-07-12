import type { RoomType } from '~/types/schedule-room/room.type'
import type { PatientType, TreatmentType, User } from '~/types'

export enum AppointmentStatus {
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
}

export type AppointmentType = {
  uuid: string
  room: RoomType
  patient: PatientType
  doctor: User
  name: string
  treatment: TreatmentType
  description: string
  start_date: string
  end_date: string
  status: AppointmentStatus
}

export type DoctorsScheduleResponse = {
  doctors: User[]
  appointments_by_doctor: Record<string, AppointmentType[]>
}

export type AppointmentPayload = {
  room_uuid: string
  patient_uuid: string
  doctor_uuid: string
  name: string
  treatment_uuid: string
  description: string
  start_date: string
  end_date: string
  status: AppointmentStatus
}
