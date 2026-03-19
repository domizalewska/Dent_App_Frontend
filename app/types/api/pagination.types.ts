export type PaginatedResult<T> = {
  current_page: number
  data: T[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export type PaginatedResponse<T> = {
  data: T[]
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}
