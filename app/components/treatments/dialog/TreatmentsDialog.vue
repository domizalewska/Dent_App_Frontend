<script setup lang="ts">
import type { TreatmentPayload, TreatmentType } from '~/types'
import { useTreatments } from '~/composables/treatments/useTreatmetns'

const props = defineProps<{
  isEdit?: boolean
  initialValues?: TreatmentType
}>()

const emit = defineEmits<{ close: [] }>()

const { addRecord, editRecord } = useTreatments()

async function onSubmit(values: TreatmentPayload) {
  if (props.isEdit && props.initialValues?.uuid) {
    await editRecord(props.initialValues.uuid, values).finally(() => emit('close'))
  } else {
    await addRecord(values).finally(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Edytuj usługę' : 'Dodaj usługę' }}</DialogTitle>
      </DialogHeader>
      <TreatmentsForm :initial-values="initialValues" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
