interface Crumb {
  name: string
  link?: string
}

export function useBreadcrumbs() {
  const breadcrumbs = useState<Crumb[]>('breadcrumbs', () => [])

  function set(items: Crumb[]) {
    breadcrumbs.value = items
  }

  function reset() {
    breadcrumbs.value = []
  }

  return { breadcrumbs, set, reset }
}
