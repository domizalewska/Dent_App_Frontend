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
  await editProfile(id, values).finally(() => emit('close'))
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[85vh] overflow-y-auto p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle class="text-sm font-medium">Edytuj dane pracownika</DialogTitle>
      </DialogHeader>
      <ContactForm
        :initial-values="user"
        :user="user"
        @submit="handleSubmit"
        @cancel="emit('close')"
      />
    </DialogContent>
  </Dialog>
</template>
