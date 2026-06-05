<script setup lang="ts">
import { useEvents } from '~/composables/schedule/useEvents'
import type { EventPayload } from '~/types/event/event.types'
import AddEventForm from '~/components/schedule/form/AddEventForm.vue'

const emit = defineEmits<{ close: [] }>()

const { addEvent } = useEvents()

async function onSubmit(values: EventPayload) {
  await addEvent(values).finally(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0">
      <DialogHeader class="px-4 pt-6">
        <DialogTitle>Dodaj zdarzenie</DialogTitle>
      </DialogHeader>
      <AddEventForm @submit="onSubmit" />
    </DialogContent>
  </Dialog>
</template>
