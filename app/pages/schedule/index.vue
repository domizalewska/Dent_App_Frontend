<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs.ts'
import { useHeader } from '~/composables/useHeader.ts'
import showAddEventDialog from '~/components/schedule/dialog/showAddEventDialog.vue'
import { useDialog } from '~/composables/useDialog.ts'

definePageMeta({
  layout: 'dashboard',
})

const { open, close, activeProps, activeComponent } = useDialog()

const { set } = useBreadcrumbs()
set([{ name: 'Kalendarz', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Kalendarz')

const options = {
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
    const date = selectInfo.startStr.slice(0, 10)
    const start = selectInfo.startStr.slice(11, 16)
    const end = selectInfo.endStr.slice(11, 16)
    open(showAddEventDialog, { prefill: { date, start, end } })
  },
  buttonText: {
    today: 'Dziś',
    week: 'Tydzień',
    month: 'Miesiąc',
  },
  events: [{ title: 'Jan Kowalski', start: '2025-01-20T08:00:00', end: '2025-01-20T16:00:00' }],
}
</script>

<template>
  <div class="fc-wrapper">
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <FullCalendar :options="options" />
  </div>
</template>
