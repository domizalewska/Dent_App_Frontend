export type Medicine = {
  uuid: string
  name: string
  description: string
  ean_gtin: string
  quantity: number
  dosage: string
  reimbursement_level: '100%' | 'flat_rate' | 'free' | 'R' | 'other'
}
