import type { RoomType } from '~/types/schedule-room/room.type'
import type { PatientSummary, TreatmentType, User } from '~/types'

export type AppointmentType = {
  uuid: string
  room: RoomType
  patient: PatientSummary
  doctor: User
  name: string
  treatment: TreatmentType
  description: string
  start_date: string
  end_date: string
  status: string
}

export type AppointmentPayload = {
  room_uuid: string
  patient_uuid: string
  doctor_uuid: string
  treatment_uuid: string
  start: string
  end: string
  description?: string
  date: string
}

export enum VisitStatus {
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  SCHEDULED = 'SCHEDULED',
}

export type VisitType = {
  uuid: string
  date: string
  status: VisitStatus
  doctor: User | null
  treatments: TreatmentType[]
}

export type VisitPayload = Omit<VisitType, 'uuid'>
