export type PatientType = {
  uuid: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  pesel?: string
  nip?: string
  address?: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export type PatientPayload = Omit<PatientType, 'uuid'>
