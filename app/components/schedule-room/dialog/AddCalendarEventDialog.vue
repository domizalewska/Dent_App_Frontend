<script setup lang="ts">
import type { CalendarEventPayload } from '~/types'
import { useCalendar } from '~/composables/calendar/useCalendar'
import AddCalendarEventForm from '~/components/schedule-room/form/AddCalendarEventForm.vue'

interface Props {
  date: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addCalendarEvent } = useCalendar()

async function onSubmit(values: CalendarEventPayload) {
  await addCalendarEvent(values).then(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader class="px-4 pt-6">
        <DialogTitle>Dodaj wizytę</DialogTitle>
      </DialogHeader>
      <AddCalendarEventForm :date="props.date" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
