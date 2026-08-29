<script setup lang="ts">
import type { User, UserPayload } from '~/types'
import ContactForm from '~/components/profile/form/ContactForm.vue'

interface Props {
  user: User
}

defineProps<Props>()

const emit = defineEmits(['close'])

const route = useRoute()
const id = route.params.id as string
const { editProfile } = useProfile()

async function handleSubmit(values: UserPayload) {
  await editProfile(id, values)
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[85vh] w-500 flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle class="text-md font-large">Edytuj dane pracownika</DialogTitle>
      </DialogHeader>
      <ContactForm :user="user" @confirm="handleSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
