import type { SortingState, Updater } from '@tanstack/vue-table'

export function useSorting(prefix?: string) {
  const sorting = ref<SortingState>([])

  const sortingParams = computed(() => {
    const id = sorting.value[0]?.id
    if (!id) return {}

    const direction = sorting.value[0]?.desc ? 'desc' : 'asc'
    return {
      sort: `${id},${direction}`,
    }
  })

  const onSortingChange = (updaterOrValue: Updater<SortingState>) => {
    sorting.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  }

  return { sorting, sortingParams, onSortingChange }
}
