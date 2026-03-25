import type { LoginPayload, User } from '~/types'

const user = useState<User | null>('user', () => null)

export function useAuth() {
  const isAuthenticated = ref<boolean>(false)
  const token = ref()
  if (import.meta.client) {
    token.value = localStorage.getItem('token')
    isAuthenticated.value = !!token.value
  }

  async function loginUser(payload: LoginPayload) {
    const { $api } = useNuxtApp()
    const { token, type } = await ($api as typeof $fetch)('/login', {
      method: 'POST',
      body: payload,
    })
    localStorage.setItem('token', token.value)
    localStorage.setItem('type', type)
    window.location.href = '/'
  }

  return {
    user,
    isAuthenticated,
    loginUser,
  }
}
