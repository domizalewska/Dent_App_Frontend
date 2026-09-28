import type { Medicine, Patient, User } from '~/types'

export type Receipt = {
  uuid: string
  name: string
  type: ReceiptEnumType
  code: string
  created_at: string
  updated_at: string
  status: string
  patient: Patient
  doctor: User
  medicine: Medicine
  medicine_uuid: string
}

export type ReceiptPayload = Omit<Receipt, 'uuid'>

export enum ReceiptEnumType {
  RP = 'RP',
  RPZ = 'RPZ',
  RPW = 'RPW',
}
