import type { User } from '~/types'

export type StatisticUser = {
  user: User
  work_hours: number
  vacation_hours: number
  sick_leave_hours: number
}

export enum HoursType {
  PRACA = 'praca',
  L4 = 'l4',
  URLOP = 'urlop',
}

export interface HoursSummary {
  praca: number
  l4: number
  urlop: number
}

export interface HoursDistributionItem {
  type: HoursType
  hours: number
  percent: number
}

export interface DailyDetailEntry {
  date: string
  type: HoursType
  source: string
  hours: number
}
