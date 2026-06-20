<script setup lang="ts">
import type { PatientType, PatientPayload } from '~/types'

const props = defineProps<{
  isEdit?: boolean
  initialValues?: PatientType
}>()

const emit = defineEmits<{ close: [] }>()

const { addRecord, editRecord } = usePatient()

async function onSubmit(values: PatientPayload) {
  if (props.isEdit && props.initialValues?.uuid) {
    await editRecord(props.initialValues.uuid, values).finally(() => emit('close'))
  } else {
    await addRecord(values as PatientType).finally(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Edytuj pacjenta' : 'Dodaj pacjenta' }}</DialogTitle>
      </DialogHeader>
      <PatientForm :patient="initialValues" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
