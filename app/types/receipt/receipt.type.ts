import type { Patient, User } from '~/types'

export type Receipt = {
  uuid: string
  name: string
  code: string
  created_at: string
  updated_at: string
  status: string
  patient: Patient
  doctor: User
  place: //uzupelnic modelem
  medicine: //uzupelnic modelem
}

export type ReceiptPayload = Omit<Receipt, 'uuid'>
