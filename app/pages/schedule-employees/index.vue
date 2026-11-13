<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import plLocale from '@fullcalendar/core/locales/pl'
import { Icon } from '@iconify/vue'
import { useAPI } from '~/composables/useAPI'
import { useCalendarNav } from '~/composables/schedule/useCalendarNav'
import { EmployeeScheduleEventType, type EmployeeScheduleType, type User } from '~/types'
import { EmployeeScheduleEndpoints, employeeScheduleKey } from '~/features/employee-schedule'
import { UsersEndpoints } from '~/features/users'
import { mockEmployeeSchedule, mockEmployees } from '~/mock/employee-schedule/mockEmployeeSchedule'

definePageMeta({ layout: 'dashboard', ssr: false })

const { set } = useBreadcrumbs()
set([{ name: 'Grafik pracowników', link: '/schedule-employees' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grafik pracowników')

const { currentDate, calendarRef, calendarWrapper, goPrev, goNext, goToday, dateLabel, dateQuery } =
  useCalendarNav()

const { data: employeesData } = useAPI<User[]>(UsersEndpoints.LIST_SELECT, {
  server: false,
  default: () => mockEmployees,
  transform: (res: User[] | { data: User[] }) => (Array.isArray(res) ? res : res.data),
})

const selectedUuids = ref<string[]>((employeesData.value ?? []).map((e) => e.uuid))

function handleSelection(val: string[]) {
  if (val.length > 0) selectedUuids.value = val
}

const scheduleQuery = computed(() => ({
  ...dateQuery.value,
  ...(selectedUuids.value.length > 0 && { 'user_uuids[]': selectedUuids.value }),
}))

const { data: scheduleEntries, pending } = useAPI<EmployeeScheduleType[]>(
  EmployeeScheduleEndpoints.BASE,
  {
    key: employeeScheduleKey,
    query: scheduleQuery,
    server: false,
    default: () => mockEmployeeSchedule,
  },
)

const resources = computed(() =>
  (employeesData.value ?? [])
    .filter((e) => selectedUuids.value.includes(e.uuid))
    .map((e) => ({
      id: e.uuid,
      title: `${e.first_name} ${e.last_name}`,
      extendedProps: { jobPosition: e.job_positions?.[0]?.name },
    })),
)

const eventTypeConfig: Record<EmployeeScheduleEventType, { color: string; label: string }> = {
  [EmployeeScheduleEventType.WORK]: { color: '#22c55e', label: 'Praca' },
  [EmployeeScheduleEventType.SICK_LEAVE]: { color: '#ef4444', label: 'L4' },
  [EmployeeScheduleEventType.VACATION]: { color: '#f97316', label: 'Urlop' },
  [EmployeeScheduleEventType.ABSENCE]: { color: '#6b7280', label: 'Nieobecność' },
}

const events = computed(() =>
  (scheduleEntries.value ?? []).map((e) => {
    const config = eventTypeConfig[e.type]
    return {
      id: e.uuid,
      resourceId: e.users?.[0]?.uuid,
      start: e.start_time ? `${e.date}T${e.start_time}` : e.date,
      end: e.end_time ? `${e.date}T${e.end_time}` : e.end_date ?? e.date,
      title: e.name ?? config.label,
      backgroundColor: config.color,
      borderColor: config.color,
      extendedProps: { entry: e },
    }
  }),
)

function resourceLabel(arg: any) {
  return {
    html: `
      <div class="resource-label__name">${arg.resource.title}</div>
      ${arg.resource.extendedProps.jobPosition ? `<div class="resource-label__role">${arg.resource.extendedProps.jobPosition}</div>` : ''}
    `,
  }
}

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, resourceTimeGridPlugin, interactionPlugin],
  initialView: 'resourceTimeGridDay',
  initialDate: currentDate.value,
  locale: plLocale,
  schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  headerToolbar: false,
  allDaySlot: true,
  slotMinTime: '06:00:00',
  slotMaxTime: '22:00:00',
  slotDuration: '00:30:00',
  slotLabelInterval: '01:00:00',
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  dayHeaderFormat: { weekday: 'short', day: 'numeric', month: 'numeric' },
  height: 'auto',
  nowIndicator: true,
  resources: resources.value,
  events: events.value,
  resourceLabelContent: resourceLabel,
}))
</script>

<template>
  <Card class="h-full overflow-hidden flex flex-col">
    <div class="flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <div class="flex items-center gap-2">
          <Button variant="outline" size="icon" @click="goPrev">
            <Icon icon="lucide:chevron-left" class="size-4" />
          </Button>
          <Button variant="outline" size="sm" @click="goToday">Dziś</Button>
          <Button variant="outline" size="icon" @click="goNext">
            <Icon icon="lucide:chevron-right" class="size-4" />
          </Button>
          <span class="min-w-[200px] text-center text-sm font-medium px-2">
            {{ dateLabel }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5">
            <span
              v-for="(config, type) in eventTypeConfig"
              :key="type"
              class="flex items-center gap-1 text-xs text-muted-foreground"
            >
              <span class="size-2.5 rounded-full shrink-0" :style="{ background: config.color }" />
              {{ config.label }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 flex-wrap px-4 py-2 border-b border-border bg-muted/30">
        <span class="text-xs text-muted-foreground font-medium shrink-0">Pracownicy:</span>
        <ToggleGroup
          type="multiple"
          :model-value="selectedUuids"
          @update:model-value="handleSelection"
        >
          <ToggleGroupItem
            v-for="employee in employeesData"
            :key="employee.uuid"
            :value="employee.uuid"
            class="flex items-center gap-1.5 text-xs"
          >
            <BaseUserAvatar :user="employee" size="size-6" class="shrink-0" />
            {{ employee.first_name }} {{ employee.last_name }}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>

    <ClientOnly>
      <div
        v-if="pending"
        class="flex flex-1 items-center justify-center text-muted-foreground text-sm"
      >
        Wczytywanie grafiku...
      </div>

      <div v-else ref="calendarWrapper" class="flex-1 overflow-auto doctors-schedule">
        <div :style="{ minWidth: `${Math.max(resources.length, 2) * 50}%` }">
          <FullCalendar :key="resources.length" ref="calendarRef" :options="calendarOptions" />
        </div>
      </div>
    </ClientOnly>
  </Card>
</template>
