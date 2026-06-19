import type { LoginPayload, User } from '~/types'

export function useAuth() {
  const user = useState<User | null>('user', () => null)
  const token = useState<string | null>('token', () => null)

  if (import.meta.client && !token.value) {
    token.value = localStorage.getItem('token')
  }

  const isAuthenticated = computed(() => !!token.value)

  async function loginUser(payload: LoginPayload) {
    const { $api } = useNuxtApp()
    const { token: authToken, type }: { token: string; type: string } = await (
      $api as typeof $fetch
    )('/login', {
      method: 'POST',
      body: payload,
      onResponseError({ response }) {
        if (response.status === 401 || response.status === 404) {
          throw new Error('Nieprawidłowy email lub hasło')
        }
        throw new Error('Wystąpił błąd. Spróbuj ponownie później.')
      },
    })

    token.value = authToken
    localStorage.setItem('token', authToken)
    localStorage.setItem('type', type)

    await navigateTo('/dashboard')
  }

  async function logoutUser() {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    await navigateTo('/login')
  }

  return {
    user,
    token,
    isAuthenticated,
    loginUser,
    logoutUser,
  }
}
