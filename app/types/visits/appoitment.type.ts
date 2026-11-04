import type { TreatmentType, User } from '~/types'

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
