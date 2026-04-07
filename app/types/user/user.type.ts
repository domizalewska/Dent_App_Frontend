export interface User {
  uuid: string
  first_name: string
  last_name: string
  email: string
  work_email: string
  phone: string
  created_at: Date
  is_active?: boolean
}
