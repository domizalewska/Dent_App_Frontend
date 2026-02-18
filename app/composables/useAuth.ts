export function useAuth() {
  const isAuthenticated = ref<boolean>(false)
  const token = ref()
  if (import.meta.client) {
    token.value = localStorage.getItem('token')
    isAuthenticated.value = !!token.value
  }

  return isAuthenticated.value
}
