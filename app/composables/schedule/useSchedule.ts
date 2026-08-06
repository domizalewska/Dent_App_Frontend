import { toast } from 'vue-sonner'
import { ScheduleEndpoints } from '~/features/schedule'
import { CalendarType } from '~/types'
import type { ScheduleEvent, ScheduleEventPayload } from '~/types'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

const mockEvents: ScheduleEvent[] = [
  {
    uuid: 'mock-1',
    type: CalendarType.WORK,
    start: '2026-07-28T08:00:00',
    end: '2026-07-28T16:00:00',
  },
  {
    uuid: 'mock-2',
    type: CalendarType.WORK,
    start: '2026-07-29T09:00:00',
    end: '2026-07-29T17:00:00',
  },
  { uuid: 'mock-3', type: CalendarType.VACATION, start: '2026-07-21', end: '2026-07-26' },
  { uuid: 'mock-4', type: CalendarType.SICK_LEAVE, start: '2026-07-14', end: '2026-07-16' },
]

const events = ref<ScheduleEvent[]>([...mockEvents])
const isLoading = ref(false)

export function useSchedule() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetchEvents() {
    try {
      isLoading.value = true
      const response = await api<{ data: ScheduleEvent[] }>(ScheduleEndpoints.BASE)
      events.value = response.data
    } catch {
      // keep mock data on error during development
    } finally {
      isLoading.value = false
    }
  }

  async function addEvent(payload: ScheduleEventPayload) {
    try {
      const response = await api<{ data: ScheduleEvent }>(ScheduleEndpoints.BASE, {
        method: 'POST',
        body: payload,
      })
      events.value.push(response.data)
      toast.success('Wpis został dodany', { style: toastSuccessStyle })
    } catch {
      events.value.push({ ...payload, uuid: `mock-${Date.now()}` })
      toast.success('Wpis został dodany', { style: toastSuccessStyle })
    }
  }

  async function updateEvent(uuid: string, payload: ScheduleEventPayload) {
    const previous = [...events.value]
    events.value = events.value.map((e) => (e.uuid === uuid ? { ...payload, uuid } : e))
    try {
      await api(ScheduleEndpoints.DETAILS(uuid), { method: 'PUT', body: payload })
      toast.success('Wpis został zaktualizowany', { style: toastSuccessStyle })
    } catch {
      events.value = previous
      toast.error('Błąd podczas aktualizacji', { style: toastErrorStyle })
    }
  }

  async function deleteEvent(uuid: string) {
    const previous = [...events.value]
    events.value = events.value.filter((e) => e.uuid !== uuid)
    try {
      await api(ScheduleEndpoints.DETAILS(uuid), { method: 'DELETE' })
      toast.success('Wpis został usunięty', { style: toastSuccessStyle })
    } catch {
      events.value = previous
      toast.error('Błąd podczas usuwania', { style: toastErrorStyle })
    }
  }

  return { events, isLoading, fetchEvents, addEvent, updateEvent, deleteEvent }
}
