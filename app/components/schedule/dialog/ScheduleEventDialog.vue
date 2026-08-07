<script setup lang="ts">
import ScheduleEventForm from '~/components/schedule/form/ScheduleEventForm.vue'
import type { ScheduleEvent, ScheduleEventPayload } from '~/types'
import { useSchedule } from '~/composables/schedule/useSchedule'

interface Props {
  scheduleEvent?: ScheduleEvent
  initialValues?: ScheduleEvent
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { addEvent, updateEvent } = useSchedule()

async function onSubmit(payload: ScheduleEventPayload) {
  if (props.scheduleEvent) {
    await updateEvent(props.scheduleEvent.uuid, payload)
  } else {
    await addEvent(payload)
  }
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0 gap-0">
      <DialogHeader class="px-4 pt-6 pb-0">
        <DialogTitle>{{ scheduleEvent ? 'Edytuj wpis' : 'Dodaj wpis do grafiku' }}</DialogTitle>
      </DialogHeader>
      <ScheduleEventForm
        :schedule-event="scheduleEvent"
        :initial-values="initialValues"
        @submit="onSubmit"
        @cancel="emit('close')"
      />
    </DialogContent>
  </Dialog>
</template>
