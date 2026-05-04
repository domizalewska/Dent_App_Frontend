import type { SortingState, Updater } from '@tanstack/vue-table'

export function useSorting() {
  const sorting = ref<SortingState>([])

  const sortingParams = computed(() => ({
    sort: sorting.value[0]?.id,
    order: sorting.value[0]?.desc ? 'desc' : 'asc',
  }))

  const onSortingChange = (updaterOrValue: Updater<SortingState>) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  }

  return { sorting, sortingParams, onSortingChange }
}
