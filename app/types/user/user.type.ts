export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: Date
  is_active?: boolean
}
