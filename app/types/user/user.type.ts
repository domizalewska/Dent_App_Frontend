import type { JobPosition } from '~/types/job-position/job-position.type'

export type User = {
  uuid: string
  first_name: string
  last_name: string
  email: string
  private_email: string | null
  private_email_verified_at: string | null
  email_verified_at: string | null
  phone_numbers?: []
  is_active: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
  profile_picture?: string
  background_picture?: string
  job_position?: JobPosition
  pwz_number?: string
}
