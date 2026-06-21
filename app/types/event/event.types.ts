import type { EventType } from '~/composables/schedule/useEventTypes'

export interface EventTypes {
  uuid: string
  type: EventType
  name: string
  description?: string
  start_date: number
  end_date: number
  is_active: boolean
}

export type EventPayload = Omit<EventTypes, 'uuid' | 'start_date' | 'end_date'> & {
  start_date: string
  end_date: string
}
