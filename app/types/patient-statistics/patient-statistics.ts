import type { User } from '~/types'

export type PatientVisitSummary = {
  uuid: string
  starts_at: string
  doctor: User
}

export type PatientNoShows = {
  count: number
  total_appointments: number
  last_at?: string
}

export type PatientLeadDoctor = {
  doctor: User
  since: string
}

export type PatientStatistics = {
  last_visit?: PatientVisitSummary
  next_visit?: PatientVisitSummary
  no_shows: PatientNoShows
  lead_doctor?: PatientLeadDoctor
}
