import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { AppointmentsEndpoints, appointmentsKey } from '~/features/appointments'
import type { AppointmentPayload } from '~/types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export function useAppointments() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addAppointment(payload: AppointmentPayload) {
    return toast.promise(
      api(AppointmentsEndpoints.BASE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(appointmentsKey)),
      {
        success: { message: 'Wizyta została dodana', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania wizyty', style: toastErrorStyle },
      },
    )
  }

  async function editAppointment(uuid: string, payload: AppointmentPayload) {
    return toast.promise(
      api(AppointmentsEndpoints.DETAILS(uuid), {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(appointmentsKey)),
      {
        success: { message: 'Wizyta została zaktualizowana', style: toastSuccessStyle },
        error: { message: 'Błąd podczas aktualizacji wizyty', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(AppointmentsEndpoints.DETAILS(uuid), {
        method: 'DELETE',
      }).then(() => refreshNuxtData(appointmentsKey)),
      {
        success: { message: 'Wizyta została usunięta', style: toastSuccessStyle },
        error: { message: 'Błąd podczas usuwania wizyty', style: toastErrorStyle },
      },
    )
  }

  return {
    addAppointment,
    editAppointment,
    deleteRecord,
  }
}
