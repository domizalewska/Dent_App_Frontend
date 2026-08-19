import type { FilterModel, PaginationData, PaginationOptions } from '~/types'
import { useSessionStorage } from '@vueuse/core'
import type { SortingState, Updater } from '@tanstack/vue-table'

export function usePagination(paginatedOptions: PaginationOptions) {
  const {
    stateKey,
    initialPage = 1,
    initialPerPage = 15,
    initialFrom = 1,
    initialTo = 10,
    initialLastPage = 1,
    initialSort,
  } = paginatedOptions

  const defaultPagination: Omit<PaginationData, 'total'> = {
    current_page: initialPage,
    from: initialFrom,
    last_page: initialLastPage,
    per_page: initialPerPage,
    to: initialTo,
  }

  const pagination = stateKey
    ? useSessionStorage(`${stateKey}-pagination`, defaultPagination)
    : ref(defaultPagination)

  const sort = stateKey
    ? useSessionStorage<string | null>(`${stateKey}-sort`, initialSort ?? null)
    : ref<string | null>(initialSort ?? null)

  const globalSearch = stateKey
    ? useSessionStorage<string | null>(`${stateKey}-search`, null)
    : ref<string | null>(null)

  const filters = stateKey
    ? useSessionStorage<FilterModel>(`${stateKey}-filters`, {})
    : ref<FilterModel>({})

  function setPageToInitial() {
    pagination.value.current_page = initialPage
  }

  const setNextPage = () => {
    pagination.value.current_page += 1
  }

  function setPage(page: number) {
    pagination.value.current_page = page
  }

  function setPerPage(perPage: number) {
    pagination.value.per_page = perPage
    setPageToInitial()
  }

  function setSort(updaterOrValue: Updater<SortingState>) {
    const [field, dir] = sort.value?.split(',') ?? []

    const current: SortingState = field ? [{ id: field, desc: dir === 'desc' }] : []

    const next = typeof updaterOrValue === 'function' ? updaterOrValue(current) : updaterOrValue

    const first = next[0]
    sort.value = first ? `${first.id},${first.desc ? 'desc' : 'asc'}` : null
    setPageToInitial()
  }

  const sortingState = computed<SortingState>(() => {
    const [field, dir] = sort.value?.split(',') ?? []
    return field ? [{ id: field, desc: dir === 'desc' }] : []
  })

  function setSearch(value: string | null) {
    globalSearch.value = value
    setPageToInitial()
  }

  function setFilters(data: FilterModel) {
    filters.value = removeNullableFilters(data)
    setPageToInitial()
  }

  function clearFilters() {
    filters.value = {}
    setPageToInitial()
  }

  function resetPagination() {
    globalSearch.value = null
    sort.value = initialSort ?? null
    filters.value = {}
    pagination.value = { ...defaultPagination }
  }

  function removeNullableFilters(data: FilterModel) {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== null && value !== undefined && value !== '',
      ),
    )
  }

  function joinArrayValues(obj: Record<string, unknown>) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(',') : value,
      ]),
    )
  }

  const paramsData = computed(() => ({
    page: pagination.value.current_page,
    perPage: pagination.value.per_page,
    ...(sort.value ? { sort: sort.value } : {}),
    ...(globalSearch.value ? { searchString: globalSearch.value } : {}),
    ...joinArrayValues(filters.value),
  }))

  const fullFilterList = computed<Record<string, unknown>>(() => ({
    ...joinArrayValues(filters.value),
    ...(sort.value ? { sort: sort.value } : {}),
    ...(globalSearch.value ? { searchString: globalSearch.value } : {}),
  }))

  const filtersCount = computed(() => Object.values(filters.value).length)

  return {
    pagination: readonly(pagination),
    globalSearch: readonly(globalSearch),
    sort: readonly(sort),
    filters: readonly(filters),
    paramsData,
    fullFilterList,
    filtersCount,
    setPage,
    setPerPage,
    setSort,
    sortingState,
    setSearch,
    setNextPage,
    setFilters,
    clearFilters,
    resetPagination,
  }
}
