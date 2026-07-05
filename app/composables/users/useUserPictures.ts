import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { UsersEndpoints } from '~/features/users/users.endpoints'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import { userInfoKey } from '~/features/users'

export const useUserPictures = (uuid: string) => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function uploadAvatar(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const promise = api(UsersEndpoints.AVATAR(uuid), { method: 'POST', body: formData })
    toast.promise(promise, {
      success: { message: 'Zdjęcie profilowe zostało zaktualizowane', style: toastSuccessStyle },
      error: { message: 'Błąd podczas przesyłania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshNuxtData(userInfoKey)
  }

  async function deleteAvatar() {
    const promise = api(UsersEndpoints.AVATAR(uuid), { method: 'DELETE' })
    toast.promise(promise, {
      success: { message: 'Zdjęcie profilowe zostało usunięte', style: toastSuccessStyle },
      error: { message: 'Błąd podczas usuwania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshNuxtData(userInfoKey)
  }

  async function uploadBackground(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const promise = api(UsersEndpoints.BACKGROUND(uuid), { method: 'POST', body: formData })
    toast.promise(promise, {
      success: { message: 'Zdjęcie w tle zostało zaktualizowane', style: toastSuccessStyle },
      error: { message: 'Błąd podczas przesyłania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshNuxtData(userInfoKey)
  }

  async function deleteBackground() {
    const promise = api(UsersEndpoints.BACKGROUND(uuid), { method: 'DELETE' })
    toast.promise(promise, {
      success: { message: 'Zdjęcie w tle zostało usunięte', style: toastSuccessStyle },
      error: { message: 'Błąd podczas usuwania zdjęcia', style: toastErrorStyle },
    })
    await promise
    await refreshNuxtData(userInfoKey)
  }

  return {
    uploadAvatar,
    deleteAvatar,
    uploadBackground,
    deleteBackground,
  }
}
