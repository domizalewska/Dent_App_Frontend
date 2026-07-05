import { toast } from 'vue-sonner'
import { refreshNuxtData } from 'nuxt/app'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import { PatientsEndpoints } from '~/features/patients'
import type { PatientType } from '~/types'
import { patientsKey, patientDetailKey } from '~/features/patients'

export const usePatient = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: PatientType) {
    return toast.promise(
      api(PatientsEndpoints().TABLE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(patientsKey)),
      {
        success: { message: 'Dodany nowy rekord', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania rekordu', style: toastErrorStyle },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<PatientType>) {
    return toast.promise(
      api(PatientsEndpoints(uuid).PATIENT_DETAILS, {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData([patientsKey, patientDetailKey(uuid)])),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(PatientsEndpoints(uuid).PATIENT_DETAILS, {
        method: 'DELETE',
      }).then(() => refreshNuxtData(patientsKey)),
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
