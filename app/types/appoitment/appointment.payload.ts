export type AppointmentPayload = {
  room_uuid: string
  patient_uuid: string
  doctor_uuid: string
  treatment_uuid: string
  date: string
  start: string
  end: string
  description?: string
}
