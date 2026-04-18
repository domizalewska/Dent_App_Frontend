<script setup lang="ts">
import { useJobPositions } from '~/composables/job-positions/useJobPositions'
import type { JobPosition } from '~/types/job-position/job-position.type'
import JobPositionForm from '~/components/job-positions/form/JobPositionForm.vue'

const props = defineProps<{
  record: JobPosition
}>()

const emit = defineEmits<{ close: [] }>()

const { editRecord } = useJobPositions()

async function onSubmit(values: JobPosition) {
  await editRecord(props.record.uuid, values).finally(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edytuj stanowisko</DialogTitle>
      </DialogHeader>
      <JobPositionForm :initial-values="record" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
