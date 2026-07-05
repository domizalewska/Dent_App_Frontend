export type TreatmentType = {
  uuid: string
  name: string
  description: string
  short_description: string
  price: number
  created_at: string
}

export type TreatmentPayload = Omit<TreatmentType, 'uuid'>
