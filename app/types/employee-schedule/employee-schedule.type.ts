import type { User } from '~/types'

export enum EmployeeScheduleEventType {
  WORK = 'WORK',
  SICK_LEAVE = 'SICK_LEAVE',
  VACATION = 'VACATION',
  ABSENCE = 'ABSENCE',
}

export type EmployeeScheduleType = {
  uuid: string
  type: EmployeeScheduleEventType
  name: string | null
  description: string | null
  date: string
  end_date: string | null
  start_time: string | null
  end_time: string | null
  is_active: boolean
  users?: User[]
  created_at: string
  updated_at: string
}
