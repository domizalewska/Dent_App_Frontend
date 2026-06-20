import { toast } from 'vue-sonner'

export default defineNuxtPlugin((nuxtApp) => {
  const apiUrl = useRuntimeConfig().public.apiBase
  const { logoutUser } = useAuth()
  const api = $fetch.create({
    baseURL: apiUrl,
    headers: {
      Accept: 'application/json',
    },
    onRequest({ options }) {
      if (import.meta.client) {
        const token = localStorage.getItem('token')
        if (token) {
          options.headers = new Headers(options.headers as HeadersInit)
          options.headers.set('Authorization', `Bearer ${token}`)
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        logoutUser()
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }

      if (response.status === 403) {
        toast('Brak uprawnień', {
          description: 'Nie masz dostępu do tej akcji',
          style: toastErrorStyle,
        })
        return
      }

      if (response.status === 422) {
        const data = response._data
        const errors = data?.errors
        const firstError = errors ? Object.values(errors)[0] : null
        toast('Błąd walidacji', {
          description: firstError ?? response._data?.message ?? 'Sprawdź poprawność danych',
          style: toastErrorStyle,
        })
        return
      }

      if (response.status === 404) {
        toast('Nie znaleziono', {
          description: 'Żądany zasób nie istnieje',
          style: toastErrorStyle,
        })
        return
      }

      toast('Wystąpił błąd', {
        description: response._data?.message ?? 'Spróbuj ponownie później',
        style: toastErrorStyle,
      })
    },
  })

  return {
    provide: {
      api,
    },
  }
})
