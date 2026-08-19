import type { CalendarType, User } from '~/types'

export type ScheduleEvent = {
  uuid: string
  resourceId: User
  type: CalendarType
  date: string
  start_time: string
  end_time: string
  date_from: string
  date_to: string
  notes?: string
  user_uuid?: string
}
export type ScheduleEventPayload = Omit<ScheduleEvent, 'uuid'>

export type ScheduleRule = {
  uuid: string
  resourceId: string
  day: DayOfWeek
  start_time: string
  end_time: string
}

export type ScheduleRulePayload = Omit<ScheduleRule, 'uuid'>

export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}
