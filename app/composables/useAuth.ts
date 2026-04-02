import type { LoginPayload, User } from '~/types'

export function useAuth() {
  const user = useState<User | null>('user', () => null)

  const isAuthenticated = computed(() => !!token.value)
  const token = ref()
  if (import.meta.client) {
    token.value = localStorage.getItem('token')
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
    await navigateTo('/dashboard')
  }

  async function logoutUser() {
    user.value = null
    localStorage.removeItem('token')
    await navigateTo('/login')
  }

  return {
    user,
    isAuthenticated,
    loginUser,
    logoutUser,
  }
}
