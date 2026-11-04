<script setup lang="ts">
import type { Patient, PatientPayload } from '~/types'

interface Props {
  patient: Patient
  isEdit?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['close'])

const route = useRoute()
const id = route.params.id as string
const { addRecord, editRecord } = usePatient()

async function onSubmit(values: PatientPayload) {
  if (props.isEdit) {
    await editRecord(id, values)
    emit('close')
  } else {
    await addRecord(values as Patient)
    emit('close')
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[85vh] w-500 flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle class="text-md font-large">{{
          isEdit ? 'Edytuj pacjenta' : 'Dodaj pacjenta'
        }}</DialogTitle>
      </DialogHeader>
      <PatientForm :patient="patient" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
