import { refreshNuxtData } from '#app'
import { toast } from 'vue-sonner'
import { ScheduleEndpoints } from '~/features/schedule'
import type { EventPayload } from '~/types/event/event.types'
import { eventsKey } from '~/composables/schedule/key'

export const useEvents = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addEvent(payload: EventPayload) {
    await api(ScheduleEndpoints().EVENTS, {
      method: 'POST',
      body: payload,
    })
    toast('Sukces!', {
      description: 'Zdarzenie zostało dodane',
      style: toastSuccessStyle,
      duration: 1500,
    })
    await refreshNuxtData(eventsKey)
  }

  return { addEvent }
}
