<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs.ts'
import { useHeader } from '~/composables/useHeader.ts'

definePageMeta({
  layout: 'dashboard',
})

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
  slotMinTime: '07:00:00',
  slotMaxTime: '21:00:00',
  slotDuration: '00:15:00',
  slotLabelInterval: '01:00:00',
  dayHeaderFormat: { weekday: 'short' },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridWeek,dayGridMonth',
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
    <FullCalendar :options="options" />
  </div>
</template>
