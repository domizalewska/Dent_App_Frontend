<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import plLocale from '@fullcalendar/core/locales/pl'
import type { EventClickArg } from '@fullcalendar/core'
import AddScheduleEntryDialog from '~/components/schedule/dialog/AddScheduleEntryDialog.vue'
import { useDialog } from '~/composables/useDialog.ts'
import { useSchedule } from '~/composables/schedule/useSchedule'
import type { ScheduleEntryFormValues, ScheduleEntryKind } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik', link: '/schedule' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik')

const { open, close, activeProps, activeComponent } = useDialog()
const { entries, deleteEntry } = useSchedule()

const ENTRY_STYLES: Record<ScheduleEntryKind, { backgroundColor: string; borderColor: string }> = {
  work: { backgroundColor: '#6366f1', borderColor: '#4f46e5' },
  vacation: { backgroundColor: '#f59e0b', borderColor: '#d97706' },
  sick_leave: { backgroundColor: '#ef4444', borderColor: '#dc2626' },
}

const calendarEvents = computed(() =>
  entries.value.map((e) => ({
    id: e.uuid,
    title: e.kind === 'work' ? 'Praca' : e.kind === 'vacation' ? 'Urlop' : 'L4',
    start: e.start,
    end: e.end,
    allDay: e.kind !== 'work',
    extendedProps: { kind: e.kind, notes: e.notes },
    ...ENTRY_STYLES[e.kind],
  })),
)

function openAdd(prefill?: Partial<ScheduleEntryFormValues>) {
  open(AddScheduleEntryDialog, prefill ? { prefill } : {})
}

function onEventClick(info: EventClickArg) {
  const kind = info.event.extendedProps.kind as ScheduleEntryKind
  if (confirm(`Usunąć wpis "${info.event.title}"?`)) {
    deleteEntry(info.event.id)
  }
}

const options = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  locale: plLocale,
  allDaySlot: true,
  editable: false,
  selectable: true,
  selectMirror: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  dayHeaderFormat: { weekday: 'short', day: 'numeric' },
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  headerToolbar: {
    left: 'prev today next',
    center: 'title',
    right: 'addEntry timeGridWeek dayGridMonth',
  },
  customButtons: {
    addEntry: {
      text: '+ Dodaj wpis',
      click: () => openAdd(),
    },
  },
  select: (info: { startStr: string; endStr: string; allDay: boolean }) => {
    if (info.allDay) {
      openAdd({
        kind: 'vacation',
        date_from: info.startStr,
        date_to: info.startStr,
      })
    } else {
      openAdd({
        kind: 'work',
        date: info.startStr.slice(0, 10),
        start_time: info.startStr.slice(11, 16),
        end_time: info.endStr.slice(11, 16),
      })
    }
  },
  eventClick: onEventClick,
  events: calendarEvents.value,
}))
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <component :is="activeComponent" v-bind="activeProps" @close="close" />

    <div class="flex items-center gap-4 text-sm text-muted-foreground">
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-sm bg-indigo-500 shrink-0" />
        Praca
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-sm bg-amber-500 shrink-0" />
        Urlop
      </div>
      <div class="flex items-center gap-1.5">
        <span class="size-3 rounded-sm bg-red-500 shrink-0" />
        L4
      </div>
    </div>

    <div class="fc-wrapper flex-1">
      <ClientOnly>
        <FullCalendar :options="options" />
      </ClientOnly>
    </div>
  </div>
</template>
