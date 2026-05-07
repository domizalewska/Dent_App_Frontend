export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type InsuranceType = 'NFZ' | 'Prywatne' | 'Brak'

export type PatientType = {
  uuid: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  pesel?: string
  address?: string
  insurance?: InsuranceType
  blood_group?: BloodGroup
  is_active: boolean
  created_at: Date
  updated_at: Date
}
