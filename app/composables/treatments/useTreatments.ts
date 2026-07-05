import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { TreatmentsEndpoints, treatmentsKey } from '~/features/treatments'
import type { TreatmentType, TreatmentPayload } from '~/types/treatments/treatments.type'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

export const useTreatments = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: TreatmentPayload) {
    return toast.promise(
      api(TreatmentsEndpoints.BASE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(treatmentsKey)),
      {
        success: { message: 'Dodany nowy rekord', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania rekordu', style: toastErrorStyle },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<TreatmentType>) {
    return toast.promise(
      api(TreatmentsEndpoints.DETAILS(uuid), {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(treatmentsKey)),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(TreatmentsEndpoints.DETAILS(uuid), {
        method: 'DELETE',
      }).then(() => refreshNuxtData(treatmentsKey)),
      {
        success: { message: 'Rekord został usunięty', style: toastSuccessStyle },
        error: { message: 'Błąd podczas usuwania rekordu', style: toastErrorStyle },
      },
    )
  }

  return {
    addRecord,
    editRecord,
    deleteRecord,
  }
}
