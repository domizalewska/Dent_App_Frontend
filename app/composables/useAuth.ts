import type { LoginPayload, User } from '~/types'

export function useAuth() {
  const user = useState<User | null>('user', () => null)

  const isAuthenticated = ref<boolean>(false)
  const token = ref()
  if (import.meta.client) {
    token.value = localStorage.getItem('token')
    isAuthenticated.value = !!token.value
  }

  async function loginUser(payload: LoginPayload) {
    const { $api } = useNuxtApp()
    const { token, type }: { token: string; type: string } = await ($api as typeof $fetch)(
      '/login',
      {
        method: 'POST',
        body: payload,
      },
    )
    localStorage.setItem('token', token)
    localStorage.setItem('type', type)
    window.location.href = '/dashboard'
  }

  function logoutUser() {
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
  }
}
