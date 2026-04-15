import { useConfirmDialog } from '@vueuse/core'
import { toast } from 'vue-sonner'
import { JobPositionsEndpoints } from '~/features/job-positions'
import type { JobPosition } from '~/types/job-position/job-position.type'

export const useJobPositions = () => {
  const { $api } = useNuxtApp()
  const { reveal } = useConfirmDialog()
  const api = $api as typeof $fetch

  async function addRecord(payload: JobPosition) {
    return toast.promise(
      api(JobPositionsEndpoints().TABLE, {
        method: 'POST',
        body: payload,
      }).then(() => refreshNuxtData(JobPositionsEndpoints().TABLE)),
      {
        success: {
          message: 'Dodany nowy rekord',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
          },
        },
        error: {
          message: 'Błąd podczas dodawania rekordu',
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
          },
        },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<JobPosition>) {
    return toast.promise(
      api(JobPositionsEndpoints(uuid).JOB_POSITION_DETAIL, {
        method: 'PUT',
        body: payload,
      }).then(() => refreshNuxtData(JobPositionsEndpoints().TABLE)),
      {
        success: {
          message: 'Zmiany zostały zapisane',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
          },
        },
        error: {
          message: 'Błąd podczas zapisywania zmian',
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
          },
        },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    const { data: confirmed } = await reveal()
    if (!confirmed) return

    return toast.promise(
      api(JobPositionsEndpoints(uuid).JOB_POSITION_DETAIL, {
        method: 'DELETE',
      }).then(() => refreshNuxtData(JobPositionsEndpoints().TABLE)),
      {
        success: {
          message: 'Rekord został usunięty',
          style: {
            '--normal-bg':
              'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
            '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))',
          },
        },
        error: {
          message: 'Błąd podczas usuwania rekordu',
          style: {
            '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
            '--normal-text': 'var(--destructive)',
            '--normal-border': 'var(--destructive)',
          },
        },
      },
    )
  }

  return {
    addRecord,
    editRecord,
    deleteRecord,
  }
}
