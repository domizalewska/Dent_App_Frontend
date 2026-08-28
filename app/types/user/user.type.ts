import type { JobPosition, TreatmentType } from '~/types'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  NON_ACTIVE = 'NON_ACTIVE',
}

export type User = {
  uuid: string
  first_name: string
  last_name: string
  status?: UserStatus
  email: string
  pesel: string
  private_email?: string
  private_email_verified_at?: string
  email_verified_at?: string
  phone_number?: string
  private_phone_number?: string
  is_active: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
  profile_picture?: string
  avatar_path?: string
  background_path?: string
  job_positions?: JobPosition
  competencies: TreatmentType[]
  street: string
  house_number: string
  apartment_number: string
  postal_code: string
  city: string
}

export type UserPayload = {
  first_name: string
  last_name: string
  email: string
  pesel: string
  private_email?: string
  phone_number?: string
  private_phone_number?: string
  job_position_uuid?: string
  pwz_number?: string
  is_active: boolean
  competencies?: TreatmentType[]
}
