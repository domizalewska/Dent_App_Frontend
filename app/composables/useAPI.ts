import { useFetch, type UseFetchOptions, useNuxtApp } from 'nuxt/app'
import type { PaginatedResponse } from '~/types/api/PaginationTypes'

export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}

export function usePaginatedAPI<T>(
  url: string | (() => string),
  options: UseFetchOptions<PaginatedResponse<T>> = {},
) {
  return useFetch<PaginatedResponse<T>>(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
