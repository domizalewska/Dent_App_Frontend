<script setup lang="ts">
import type { AppointmentPayload } from '~/types'
import { useAppointments } from '~/composables/appointments/useAppointments'
import AddAppointmentForm from '~/components/schedule-room/form/AddAppointmentForm.vue'

interface Props {
  date: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addAppointment } = useAppointments()

async function onSubmit(values: AppointmentPayload) {
  await addAppointment(values).then(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader class="px-4 pt-6">
        <DialogTitle>Dodaj wizytę</DialogTitle>
      </DialogHeader>
      <AddAppointmentForm :date="props.date" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
