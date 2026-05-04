import type { SortingState, Updater } from '@tanstack/vue-table'

export function useSorting(prefix?: string) {
  const sorting = ref<SortingState>([])

  const sortingParams = computed(() => {
    const id = sorting.value[0]?.id
    return {
      sort: id ? (prefix ? `${prefix}[${id}]` : id) : undefined,
      order: sorting.value[0]?.desc ? 'desc' : 'asc',
    }
  })

  const onSortingChange = (updaterOrValue: Updater<SortingState>) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  }

  return { sorting, sortingParams, onSortingChange }
}
