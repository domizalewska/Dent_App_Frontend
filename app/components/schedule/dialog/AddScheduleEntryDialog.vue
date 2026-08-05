<script setup lang="ts">
import AddScheduleEntryForm from '~/components/schedule/form/AddScheduleEntryForm.vue'
import type { ScheduleEntry, ScheduleEntryFormValues, ScheduleEntryPayload } from '~/types'
import { useSchedule } from '~/composables/schedule/useSchedule'

interface Props {
  prefill?: Partial<ScheduleEntryFormValues>
  entry?: ScheduleEntry
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { addEntry, updateEntry } = useSchedule()

const isEdit = computed(() => !!props.entry)

const prefillFromEntry = computed((): Partial<ScheduleEntryFormValues> | undefined => {
  if (!props.entry) return props.prefill
  const e = props.entry
  if (e.kind === 'work') {
    return {
      kind: 'work',
      date: e.start.slice(0, 10),
      start_time: e.start.slice(11, 16),
      end_time: e.end.slice(11, 16),
      notes: e.notes,
    }
  }
  const endDate = new Date(e.end)
  endDate.setDate(endDate.getDate() - 1)
  return {
    kind: e.kind,
    date_from: e.start,
    date_to: endDate.toISOString().slice(0, 10),
    notes: e.notes,
  }
})

async function onSubmit(payload: ScheduleEntryPayload) {
  if (isEdit.value && props.entry) {
    await updateEntry(props.entry.uuid, payload)
  } else {
    await addEntry(payload)
  }
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0 gap-0">
      <DialogHeader class="px-4 pt-6 pb-0">
        <DialogTitle>{{ isEdit ? 'Edytuj wpis' : 'Dodaj wpis do grafiku' }}</DialogTitle>
      </DialogHeader>
      <AddScheduleEntryForm :prefill="prefillFromEntry" @submit="onSubmit" />
    </DialogContent>
  </Dialog>
</template>
