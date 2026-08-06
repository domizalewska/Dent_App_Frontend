import type { CalendarType } from '~/types'

export type ScheduleEvent = {
  uuid: string
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

export interface ScheduleRule {
  uuid: string
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
