<script setup lang="ts">
import type { PermissionGroupType, User } from '~/types'
import { UsersEndpoints } from '~/features/users'

interface Props {
  group: PermissionGroupType
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { assignUsers } = usePermissionGroups()

const selectedUserUuids = ref<string[]>([])
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  await assignUsers(props.group.uuid, selectedUserUuids.value)
  loading.value = false
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-w-md flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle>Przypisz użytkowników</DialogTitle>
        <DialogDescription>{{ group.name }}</DialogDescription>
      </DialogHeader>
      <div class="px-4 py-4">
        <BaseMultiselect
          v-model="selectedUserUuids"
          :api="UsersEndpoints.LIST_SELECT"
          :option-value="(u: User) => u.uuid"
          :option-label="(u: User) => `${u.first_name} ${u.last_name}`"
          label="Użytkownicy"
          placeholder="Wybierz użytkowników..."
        />
      </div>
      <div class="border-t px-4 py-3">
        <BaseAcceptDeclineButtons
          confirm-title="Zapisz"
          cancel-title="Anuluj"
          :confirm-disabled="loading"
          @accept="onSubmit"
          @cancel="emit('close')"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
