import type { User } from '~/types'

export type StatisticUser = {
  user: User
  work_hours: number
  vacation_hours: number
  sick_leave_hours: number
}
