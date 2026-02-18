import { ref } from 'vue'

interface Crumb {
  name: string
  link?: string
}

export const breadcrumbs = ref<Crumb[]>([])

export function useBreadcrumbs() {
  function set(items: Crumb[]) {
    breadcrumbs.value = items
  }

  function reset() {
    breadcrumbs.value = []
  }

  return { breadcrumbs, set, reset }
}
