import type { UserPayload } from '~/types'
import { profileKey, UsersEndpoints } from '~/features/users'
import { toast } from 'vue-sonner'
import { refreshNuxtData } from '#app'

export const useProfile = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function editProfile(uuid: string, payload: UserPayload) {
    await api(UsersEndpoints.DETAILS(uuid), {
      method: 'PUT',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie edytowano dane',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(profileKey(uuid))
  }
  async function editCompetencies(uuid: string, competencies: string[]) {
    const { $api } = useNuxtApp()
    const api = $api as typeof $fetch
    await api(UsersEndpoints.DETAILS(uuid), {
      method: 'PUT',
      body: { competencies },
    })
    toast('Sukces!', {
      description: 'Kompetencje zostały zaktualizowane',
      style: toastSuccessStyle,
      duration: 1500,
    })
    await refreshNuxtData(profileKey(uuid))
  }

  return {
    editProfile,
    editCompetencies,
  }
}
