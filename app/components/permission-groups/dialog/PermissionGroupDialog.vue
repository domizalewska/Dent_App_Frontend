<script setup lang="ts">
import type { PermissionGroupType, PermissionGroupPayload } from '~/types'

interface Props {
  group?: PermissionGroupType
  isEdit?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { addGroup, editGroup } = usePermissionGroups()

async function onSubmit(values: PermissionGroupPayload) {
  if (props.isEdit && props.group) {
    await editGroup(props.group.uuid, values)
  } else {
    await addGroup(values)
  }
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[85vh] flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle>{{ isEdit ? 'Edytuj grupę uprawnień' : 'Dodaj grupę uprawnień' }}</DialogTitle>
      </DialogHeader>
      <PermissionGroupForm :group="group" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
