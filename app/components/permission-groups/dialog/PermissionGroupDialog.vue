<script setup lang="ts">
import type { PermissionGroupType } from '~/types'

interface Props {
  group?: PermissionGroupType
  isEdit?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { addGroup, editGroup, assignPermissions } = usePermissionGroups()

async function onSubmit(values: {
  name: string
  description?: string | null
  permissionUuids: string[]
}) {
  const { permissionUuids, ...payload } = values

  if (props.isEdit && props.group) {
    await editGroup(props.group.uuid, payload)
    if (permissionUuids.length) {
      await assignPermissions(props.group.uuid, permissionUuids)
    }
  } else {
    const created = await addGroup(payload) as { uuid: string } | undefined
    if (created?.uuid && permissionUuids.length) {
      await assignPermissions(created.uuid, permissionUuids)
    }
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
