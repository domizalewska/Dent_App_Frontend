interface EventTypes {
  uuid: string
  title: string
  patient_uuid: string
  doctor_uuid: string
  date: string
  start: string
  end: string
  notes?: string
}

export type EventPayload = Omit<EventTypes, 'uuid'>
