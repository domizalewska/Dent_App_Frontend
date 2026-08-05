export type ScheduleEntryKind = 'work' | 'sick_leave' | 'vacation'

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
