import { toast } from 'vue-sonner'
import { ScheduleEndpoints } from '~/features/schedule'
import type { EventPayload } from '~/types/event/event.types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export const useEvents = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addEvent(payload: EventPayload) {
    return toast.promise(
      api(ScheduleEndpoints().TABLE, {
        method: 'POST',
        body: payload,
      }),
      {
        success: { message: 'Zdarzenie zostało dodane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania zdarzenia', style: toastErrorStyle },
      },
    )
  }

  return { addEvent }
}
