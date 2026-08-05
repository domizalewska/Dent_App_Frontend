export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export interface WorkScheduleRule {
  day: DayOfWeek
  start_time: string
  end_time: string
}

export enum ScheduleEntryKind {
  Work = 'work',
  SickLeave = 'sick_leave',
  Vacation = 'vacation',
}

export type ScheduleEntry = {
  uuid: string
  kind: ScheduleEntryKind
  start: string
  end: string
  notes?: string
  user_uuid?: string
}

export type ScheduleEntryPayload = Omit<ScheduleEntry, 'uuid'>

export interface ScheduleCalendarEvent {
  extendedProps: {
    kind: ScheduleEntryKind
    source: ScheduleEntry
  }
}

export type ScheduleEntryFormValues = {
  kind: ScheduleEntryKind
  date?: string
  start_time?: string
  end_time?: string
  date_from?: string
  date_to?: string
  notes?: string
}
