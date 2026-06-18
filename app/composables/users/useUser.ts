import { UsersEndpoints } from '~/features/users'
import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'

export const useUser = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function deactivateUser(uuid: string) {
    await api(UsersEndpoints(uuid).USER_DETAILS, {
      method: 'PUT',
      body: { is_active: false },
    })
    toast('Sukces!', {
      description: 'Poprawnie dezaktywowano użytkownika',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(`users`)
  }
  return {
    deactivateUser,
  }
}
