import type { UserPayload } from '~/types'
import { UsersEndpoints } from '~/features/users'
import { toast } from 'vue-sonner'
import { refreshNuxtData } from '#app'

export const useProfile = (uuid: string) => {
  async function editProfile(payload: UserPayload) {
    const { $api } = useNuxtApp()
    const api = $api as typeof $fetch
    await api(UsersEndpoints(uuid).USER_DETAILS, {
      method: 'PUT',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie edytowano dane',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(`profile-${uuid}`)
  }
  return {
    editProfile,
  }
}