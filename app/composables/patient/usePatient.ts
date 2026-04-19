import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import { PatientsEndpoints } from '~/features/patients'
import type { PatientType } from '~/types'
import { PatientTable } from '~/symbols'

export const usePatient = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: PatientType) {
    return toast.promise(
      api(PatientsEndpoints().TABLE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(PatientTable.toString())),
      {
        success: { message: 'Dodany nowy rekord', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania rekordu', style: toastErrorStyle },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<PatientType>) {
    return toast.promise(
      api(PatientsEndpoints(uuid).JOB_POSITION_DETAIL, {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(PatientTable.toString())),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(PatientsEndpoints(uuid).JOB_POSITION_DETAIL, {
        method: 'DELETE',
      }).then(() => refreshNuxtData(PatientTable.toString())),
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
