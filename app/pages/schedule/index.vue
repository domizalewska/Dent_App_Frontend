<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
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
  editable: true,
  events: [{ title: 'Jan Kowalski', start: '2025-01-20T08:00:00', end: '2025-01-20T16:00:00' }],
}
</script>

<template>
  <FullCalendar :options="options" />
</template>
