<script setup lang="ts">
import type { PatientType } from '~/types'

const props = defineProps<{
  isEdit?: boolean
  initialValues?: Partial<PatientType>
}>()

const emit = defineEmits<{ close: [] }>()

const { addRecord, editRecord } = usePatient()

async function onSubmit(values: Partial<PatientType>) {
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
      <PatientForm :initial-values="initialValues" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
