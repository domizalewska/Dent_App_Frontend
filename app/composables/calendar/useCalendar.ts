import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { CalendarEndpoints, calendarKey } from '~/features/calendar'
import type { CalendarEventPayload } from '~/types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export function useCalendar() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addCalendarEvent(payload: CalendarEventPayload) {
    return toast.promise(
      api(CalendarEndpoints.BASE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(calendarKey)),
      {
        success: { message: 'Wizyta została dodana', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania wizyty', style: toastErrorStyle },
      },
    )
  }

  async function editCalendarEvent(uuid: string, payload: CalendarEventPayload) {
    return toast.promise(
      api(CalendarEndpoints.DETAILS(uuid), {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(calendarKey)),
      {
        success: { message: 'Wizyta została zaktualizowana', style: toastSuccessStyle },
        error: { message: 'Błąd podczas aktualizacji wizyty', style: toastErrorStyle },
      },
    )
  }

  async function deleteCalendarEvent(uuid: string) {
    return toast.promise(
      api(CalendarEndpoints.DETAILS(uuid), {
        method: 'DELETE',
      }).then(() => refreshNuxtData(calendarKey)),
      {
        success: { message: 'Wizyta została usunięta', style: toastSuccessStyle },
        error: { message: 'Błąd podczas usuwania wizyty', style: toastErrorStyle },
      },
    )
  }

  return {
    addCalendarEvent,
    editCalendarEvent,
    deleteCalendarEvent,
  }
}
