<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs.ts'
import { useHeader } from '~/composables/useHeader.ts'
import showAddEventDialog from '~/components/schedule/dialog/showAddEventDialog.vue'
import { useDialog } from '~/composables/useDialog.ts'
import { ScheduleEndpoints } from '~/features/schedule/index.ts'
import { eventsKey } from '~/composables/schedule/key.ts'
import { type EventTypes } from '~/types/event/event.types'

definePageMeta({
  layout: 'dashboard',
})

const { open, close, activeProps, activeComponent } = useDialog()

const { set } = useBreadcrumbs()
set([{ name: 'Kalendarz', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Kalendarz')

const { paramsData } = usePagination({
  stateKey: eventsKey,
})

const { data: calendarData } = await usePaginatedAPI<EventTypes>(ScheduleEndpoints().EVENTS, {
  key: eventsKey,
  paramsData,
})

const calendarEvents = computed(() =>
  (calendarData.value?.data ?? []).map((e) => ({
    id: e.uuid,
    title: e.name,
    start: new Date(e.start_date * 1000).toISOString(),
    end: new Date(e.end_date * 1000).toISOString(),
  })),
)

const baseOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: plLocale,
  allDaySlot: false,
  editable: true,
  selectable: true,
  selectMirror: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '23:00:00',
  slotDuration: '00:15:00',
  slotLabelInterval: '01:00:00',
  dayHeaderFormat: { weekday: 'short' },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  headerToolbar: {
    left: 'prev today next',
    center: 'title',
    right: 'addEvent timeGridWeek dayGridMonth',
  },
  customButtons: {
    addEvent: {
      text: 'Dodaj zdarzenie',
      click: () => open(showAddEventDialog),
    },
  },
  select: (selectInfo) => {
    open(showAddEventDialog, {
      prefill: { start_date: selectInfo.startStr, end_date: selectInfo.endStr },
    })
  },
  buttonText: {
    today: 'Dziś',
    week: 'Tydzień',
    month: 'Miesiąc',
  },
}

const options = computed(() => ({
  ...baseOptions,
  events: calendarEvents.value,
}))
</script>

<template>
  <div class="fc-wrapper">
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <FullCalendar :options="options" />
  </div>
</template>
