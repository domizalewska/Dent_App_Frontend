import type { UserPayload } from '~/types'
import { UsersEndpoints } from '~/features/users'
import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { usersKey } from './key'

export const useUser = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function deactivateUser(uuid: string) {
    await api(UsersEndpoints(uuid).DETAIL, {
      method: 'PUT',
      body: { is_active: false },
    })
    toast('Sukces!', {
      description: 'Poprawnie dezaktywowano użytkownika',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(usersKey)
  }

  async function addUser(payload: UserPayload) {
    await api(UsersEndpoints().TABLE, {
      method: 'POST',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie dodano użytkownika',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(usersKey)
  }

  async function editUser(uuid: string, payload: UserPayload) {
    await api(UsersEndpoints(uuid).DETAIL, {
      method: 'PUT',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Poprawnie edytowano użytkownika',
      style: toastSuccessStyle,
      duration: 1500,
    })

    await refreshNuxtData(usersKey)
  }

  return {
    deactivateUser,
    addUser,
    editUser,
  }
}
