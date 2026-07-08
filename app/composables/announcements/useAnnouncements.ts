import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { AnnouncementsEndpoints, announcementsKey } from '~/features/announcements'
import type { AnnouncementPayload } from '~/types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export function useAnnouncements() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: AnnouncementPayload) {
    return toast.promise(
      api(AnnouncementsEndpoints.BASE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(announcementsKey)),
      {
        success: { message: 'Ogłoszenie zostało dodane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania ogłoszenia', style: toastErrorStyle },
      },
    )
  }

  return { addRecord }
}
