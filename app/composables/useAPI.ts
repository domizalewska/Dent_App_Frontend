import { useFetch, type UseFetchOptions, useNuxtApp } from 'nuxt/app'
import type { PaginatedResponse, PaginatedResult } from '~/types/api/pagination.types'

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
    server: false,
  })
}

export function usePaginatedAPI<T>(url: string | (() => string), options?: object) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
    transform(data: PaginatedResult<T>): PaginatedResponse<T> {
      const { data: items, ...pagination } = data
      return {
        data: items,
        pagination: {
          current_page: pagination.current_page,
          from: pagination.from,
          last_page: pagination.last_page,
          per_page: pagination.per_page,
          to: pagination.to,
          total: pagination.total,
        },
      }
    },
    server: false,
  })
}
