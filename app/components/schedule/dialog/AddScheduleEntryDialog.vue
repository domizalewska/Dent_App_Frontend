<script setup lang="ts">
import AddScheduleEntryForm from '~/components/schedule/form/AddScheduleEntryForm.vue'
import type { ScheduleEntryFormValues, ScheduleEntryPayload } from '~/types'
import { useSchedule } from '~/composables/schedule/useSchedule'

interface Props {
  prefill?: Partial<ScheduleEntryFormValues>
}

defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addEntry } = useSchedule()

async function onSubmit(payload: ScheduleEntryPayload) {
  await addEntry(payload)
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0 gap-0">
      <DialogHeader class="px-4 pt-6 pb-0">
        <DialogTitle>Dodaj wpis do grafiku</DialogTitle>
      </DialogHeader>
      <AddScheduleEntryForm :prefill="prefill" @submit="onSubmit" />
    </DialogContent>
  </Dialog>
</template>
