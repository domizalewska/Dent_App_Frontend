import { toast } from 'vue-sonner'
import { UsersEndpoints } from '~/features/users/users.endpoints'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import type { User } from '~/types'

export const useUserPictures = (uuid: string) => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch
  const { user } = useAuth()

  async function refreshUser() {
    const updated = await api<User>('/user/user-info')
    user.value = updated
  }

  async function uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const promise = api(UsersEndpoints(uuid).AVATAR, { method: 'POST', body: formData })
    toast.promise(promise, {
      success: { message: 'Zdjęcie profilowe zostało zaktualizowane', style: toastSuccessStyle },
      error: { message: 'Błąd podczas przesyłania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshUser()
  }

  async function deleteAvatar() {
    const promise = api(UsersEndpoints(uuid).AVATAR, { method: 'DELETE' })
    toast.promise(promise, {
      success: { message: 'Zdjęcie profilowe zostało usunięte', style: toastSuccessStyle },
      error: { message: 'Błąd podczas usuwania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshUser()
  }

  async function uploadBackground(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const promise = api(UsersEndpoints(uuid).BACKGROUND, { method: 'POST', body: formData })
    toast.promise(promise, {
      success: { message: 'Zdjęcie w tle zostało zaktualizowane', style: toastSuccessStyle },
      error: { message: 'Błąd podczas przesyłania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshUser()
  }

  async function deleteBackground() {
    const promise = api(UsersEndpoints(uuid).BACKGROUND, { method: 'DELETE' })
    toast.promise(promise, {
      success: { message: 'Zdjęcie w tle zostało usunięte', style: toastSuccessStyle },
      error: { message: 'Błąd podczas usuwania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshUser()
  }

  return {
    uploadAvatar,
    deleteAvatar,
    uploadBackground,
    deleteBackground,
  }
}
