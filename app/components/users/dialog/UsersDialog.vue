<script setup lang="ts">
import type { User, UserPayload } from '~/types'
import UserForm from '~/components/users/form/UserForm.vue'

const props = defineProps<{
  isEdit?: boolean
  initialValues?: User
}>()

const emit = defineEmits<{ close: [] }>()

const { addUser, editUser } = useUser()

async function onSubmit(values: UserPayload) {
  if (props.isEdit && props.initialValues?.uuid) {
    await editUser(props.initialValues.uuid, values).finally(() => emit('close'))
  } else {
    await addUser(values).finally(() => emit('close'))
  }
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ isEdit ? 'Edytuj pracownika' : 'Dodaj pracownika' }}</DialogTitle>
      </DialogHeader>
      <UserForm :initial-values="initialValues" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
