export default defineNuxtPlugin((nuxtApp) => {
  const apiUrl = useRuntimeConfig().public.apiBase
  const { logoutUser } = useAuth()
  const api = $fetch.create({
    baseURL: apiUrl,
    onRequest({ options }) {
      if (import.meta.client) {
        const token = localStorage.getItem('token')
        if (token) {
          options.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        logoutUser()
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
