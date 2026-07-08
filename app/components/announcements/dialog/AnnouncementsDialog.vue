<script setup lang="ts">
import type { AnnouncementPayload } from '~/types'
import { useAnnouncements } from '~/composables/announcements/useAnnouncements'
import AnnouncementsForm from '~/components/announcements/form/AnnouncementsForm.vue'

const emit = defineEmits<{ close: [] }>()

const { addRecord } = useAnnouncements()

async function onSubmit(values: AnnouncementPayload) {
  await addRecord(values).finally(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj ogłoszenie</DialogTitle>
      </DialogHeader>
      <AnnouncementsForm @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
