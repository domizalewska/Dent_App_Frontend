import { toast } from 'vue-sonner'
import { ScheduleEndpoints } from '~/features/schedule'
import type { ScheduleEntry, ScheduleEntryPayload } from '~/types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

const mockEntries: ScheduleEntry[] = [
  {
    uuid: 'mock-1',
    kind: 'work',
    start: '2026-07-28T08:00:00',
    end: '2026-07-28T16:00:00',
  },
  {
    uuid: 'mock-2',
    kind: 'work',
    start: '2026-07-29T09:00:00',
    end: '2026-07-29T17:00:00',
  },
  {
    uuid: 'mock-3',
    kind: 'vacation',
    start: '2026-07-21',
    end: '2026-07-26',
  },
  {
    uuid: 'mock-4',
    kind: 'sick_leave',
    start: '2026-07-14',
    end: '2026-07-16',
  },
]

const entries = ref<ScheduleEntry[]>([...mockEntries])
const isLoading = ref(false)

export function useSchedule() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetchEntries() {
    try {
      isLoading.value = true
      const response = await api<{ data: ScheduleEntry[] }>(ScheduleEndpoints.BASE)
      entries.value = response.data
    } catch {
      // keep mock data on error during development
    } finally {
      isLoading.value = false
    }
  }

  async function addEntry(payload: ScheduleEntryPayload) {
    try {
      const response = await api<{ data: ScheduleEntry }>(ScheduleEndpoints.BASE, {
        method: 'POST',
        body: payload,
      })
      entries.value.push(response.data)
      toast.success('Wpis został dodany', { style: toastSuccessStyle })
    } catch {
      // optimistic mock for development
      entries.value.push({ ...payload, uuid: `mock-${Date.now()}` })
      toast.success('Wpis został dodany', { style: toastSuccessStyle })
    }
  }

  async function deleteEntry(uuid: string) {
    const previous = [...entries.value]
    entries.value = entries.value.filter((e) => e.uuid !== uuid)
    try {
      await api(ScheduleEndpoints.DETAILS(uuid), { method: 'DELETE' })
      toast.success('Wpis został usunięty', { style: toastSuccessStyle })
    } catch {
      entries.value = previous
      toast.error('Błąd podczas usuwania', { style: toastErrorStyle })
    }
  }

  return { entries, isLoading, fetchEntries, addEntry, deleteEntry }
}
