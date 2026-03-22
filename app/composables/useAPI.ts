import { useFetch, type UseFetchOptions, useNuxtApp } from 'nuxt/app'
import type { PaginatedResponse } from '~/types/api/pagination.types'

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
  const config = useRuntimeConfig()
  return useFetch<PaginatedResponse<T>>(url, {
    baseURL: config.public.apiBase,
    server: false,
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
    transform: (response: PaginatedResponse<T>) => ({
      ...response,
      items: response.data,
    }),
  })
}
