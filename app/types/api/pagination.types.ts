export type PaginatedResult<T> = {
  data: T[]
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export type PaginationData = {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export type PaginatedResponse<T> = {
  data: T[]
  pagination: PaginationData
}

export type PaginationOptions = {
  initialPage?: number
  initialPerPage?: number
  initialFrom?: number
  initialTo?: number
  initialLastPage?: number
  initialSort?: string
  stateKey?: string
  debounceMs?: number
}
