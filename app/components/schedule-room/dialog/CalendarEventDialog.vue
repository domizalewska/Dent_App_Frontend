<script setup lang="ts">
import type { CalendarEventPayload, CalendarEventType } from '~/types'
import { useCalendar } from '~/composables/calendar/useCalendar'
import AddCalendarEventForm from '~/components/schedule-room/form/AddCalendarEventForm.vue'

interface Props {
  appointment?: CalendarEventType
  date?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addCalendarEvent, editCalendarEvent } = useCalendar()

const isEdit = computed(() => !!props.appointment)
const date = computed(() => props.appointment?.date ?? props.date ?? '')

async function onSubmit(values: CalendarEventPayload) {
  if (isEdit.value && props.appointment) {
    await editCalendarEvent(props.appointment.uuid, values).then(() => emit('close'))
  } else {
    await addCalendarEvent(values).then(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader class="px-4 pt-6">
        <DialogTitle>{{ isEdit ? 'Edytuj wizytę' : 'Dodaj wizytę' }}</DialogTitle>
      </DialogHeader>
      <AddCalendarEventForm
        :date="date"
        :initial-values="appointment"
        @submit="onSubmit"
        @cancel="emit('close')"
      />
    </DialogContent>
  </Dialog>
</template>
