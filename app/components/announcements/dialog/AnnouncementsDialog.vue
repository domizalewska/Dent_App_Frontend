<script setup lang="ts">
import type { Announcement, AnnouncementPayload } from '~/types'
import { useAnnouncements } from '~/composables/announcements/useAnnouncements'
import AnnouncementsForm from '~/components/announcements/form/AnnouncementsForm.vue'

interface Props {
  isEdit?: boolean
  initialValues?: Announcement
}

const props = defineProps<Props>()

const emit = defineEmits<{ close: [] }>()

const { addRecord, editRecord } = useAnnouncements()

async function onSubmit(values: AnnouncementPayload) {
  if (props.isEdit && props.initialValues?.uuid) {
    await editRecord(props.initialValues.uuid, values).then(() => emit('close'))
  } else {
    await addRecord(values).then(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <div class="flex items-center gap-2">
          <DialogTitle>{{ isEdit ? 'Edytuj ogłoszenie' : 'Dodaj ogłoszenie' }}</DialogTitle>
          <Badge v-if="isEdit" variant="secondary" class="text-xs">Edycja</Badge>
        </div>
      </DialogHeader>
      <AnnouncementsForm :initial-values="initialValues" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
