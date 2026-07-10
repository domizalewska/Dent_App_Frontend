<script setup lang="ts">
import type { AppointmentPayload, AppointmentType } from '~/types'
import { useAppointments } from '~/composables/appointments/useAppointments'
import AddAppointmentForm from '~/components/schedule-room/form/AddAppointmentForm.vue'

interface Props {
  appointment?: AppointmentType
  date?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addAppointment, editAppointment } = useAppointments()

const isEdit = computed(() => !!props.appointment)
const date = computed(() => props.appointment?.start_date.slice(0, 10) ?? props.date ?? '')

async function onSubmit(values: AppointmentPayload) {
  if (isEdit.value && props.appointment) {
    await editAppointment(props.appointment.uuid, values).finally(() => emit('close'))
  } else {
    await addAppointment(values).finally(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader class="px-4 pt-6">
        <DialogTitle>{{ isEdit ? 'Edytuj wizytę' : 'Dodaj wizytę' }}</DialogTitle>
      </DialogHeader>
      <AddAppointmentForm
        :date="date"
        :initial-values="appointment"
        @submit="onSubmit"
        @cancel="emit('close')"
      />
    </DialogContent>
  </Dialog>
</template>
