import { toast } from 'vue-sonner'
import { JobPositionsEndpoints } from '~/features/job-positions'
import type { JobPosition } from '~/types/job-position/job-position.type'
import { refreshNuxtData } from 'nuxt/app'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'
import { jobPositionsKey } from '~/features/job-positions'

export const useJobPositions = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: JobPosition) {
    return toast.promise(
      api(JobPositionsEndpoints.BASE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(jobPositionsKey)),
      {
        success: { message: 'Dodany nowy rekord', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania rekordu', style: toastErrorStyle },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<JobPosition>) {
    return toast.promise(
      api(JobPositionsEndpoints.DETAILS(uuid), {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(jobPositionsKey)),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(JobPositionsEndpoints.DETAILS(uuid), {
        method: 'DELETE',
      }).then(() => refreshNuxtData(jobPositionsKey)),
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
