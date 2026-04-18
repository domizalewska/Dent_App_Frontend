<script setup lang="ts">
import { useJobPositions } from '~/composables/job-positions/useJobPositions'
import type { JobPosition } from '~/types/job-position/job-position.type'
import JobPositionForm from '~/components/job-positions/form/JobPositionForm.vue'

const emit = defineEmits<{ close: [] }>()

const { addRecord } = useJobPositions()

async function onSubmit(values: JobPosition) {
  await addRecord(values).finally(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj stanowisko</DialogTitle>
      </DialogHeader>
      <JobPositionForm @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
