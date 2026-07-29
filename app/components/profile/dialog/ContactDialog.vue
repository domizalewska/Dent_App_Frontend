<script setup lang="ts">
import type { User } from '~/types'
import ContactForm from '~/components/profile/form/ContactForm.vue'

interface Props {
  user: User
}

defineProps<Props>()

const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-h-[85vh] overflow-y-auto p-0 sm:max-w-lg">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle class="text-sm font-medium">Edytuj dane pracownika</DialogTitle>
      </DialogHeader>
      <ContactForm :user="user" @submitted="open = false" @cancelled="open = false" />
    </DialogContent>
  </Dialog>
</template>
