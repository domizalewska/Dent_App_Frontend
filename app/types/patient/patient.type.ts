export type PatientType = {
  uuid: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  pesel?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}
