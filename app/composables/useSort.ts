export function useSort() {
  const sort = ref<string | null>(null)

  function onSortChange(field: string | null, desc: boolean) {
    sort.value = field ? `${desc ? '-' : ''}${field}` : null
  }

  const query = computed(() => (sort.value ? { sort: sort.value } : {}))

  return { query, onSortChange }
}
