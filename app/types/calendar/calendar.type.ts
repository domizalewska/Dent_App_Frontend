import type { PatientSummary, TreatmentType, User } from '~/types'

export enum CalendarType {
  WORK = 'WORK',
  SICK_LEAVE = 'SICK_LEAVE',
  VACATION = 'VACATION',
  EXAMINATION = 'EXAMINATION',
  OTHER = 'OTHER',
}

export type CalendarEventType = {
  uuid: string
  type: 'EXAMINATION' | 'OTHER'
  name: string | null
  description: string | null
  date: string
  end_date: string | null
  start_time: string | null
  end_time: string | null
  no_show: boolean
  is_active: boolean
  users: User[]
  patients: PatientSummary[]
  treatment?: TreatmentType | null
  created_at: string
  updated_at: string
}

export type CalendarEventPayload = {
  type: 'EXAMINATION' | 'OTHER'
  name?: string
  description?: string
  patient_uuid: string
  doctor_uuid: string
  date: string
  start_time: string
  end_time: string
  treatment_uuid?: string
}
