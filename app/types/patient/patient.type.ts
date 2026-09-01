export type Patient = {
  uuid: string
  first_name: string
  last_name: string
  email?: string
  phone_number?: string
  pesel?: string
  street: string
  house_number: string
  apartment_number: string
  postal_code: string
  city: string
  notes: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export type PatientPayload = Omit<Patient, 'uuid'>
