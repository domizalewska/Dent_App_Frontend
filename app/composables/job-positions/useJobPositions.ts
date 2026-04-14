import { useConfirmDialog } from '@vueuse/core'
import { JobPositionsEndpoints } from '~/features/job-positions'
import type { JobPosition } from '~/types/job-position/job-position.type'

export const useJobPositions = () => {
  const { $api } = useNuxtApp()
  const { reveal } = useConfirmDialog()
  const toast = useToast()
  const api = $api as typeof $fetch

  async function addRecord(payload: JobPosition) {
    await api(JobPositionsEndpoints().TABLE, {
      method: 'POST',
      body: payload,
    })
    toast.add({ title: 'Stanowisko zostało dodane' })
  }

  async function editRecord(uuid: string, payload: Partial<JobPosition>) {
    await api(JobPositionsEndpoints(uuid).JOB_POSITION_DETAIL, {
      method: 'PUT',
      body: payload,
    })
    toast.add({ title: 'Stanowisko zostało zaktualizowane' })
  }

  async function deleteRecord(uuid: string) {
    const { data: confirmed } = await reveal()
    if (!confirmed) return

    await api(JobPositionsEndpoints(uuid).JOB_POSITION_DETAIL, {
      method: 'DELETE',
    })
    toast.add({ title: 'Stanowisko zostało usunięte' })
  }

  return {
    addRecord,
    editRecord,
    deleteRecord,
  }
}
