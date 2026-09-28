<script setup lang="ts">
import type { Receipt, UserPayload } from '~/types'

interface Props {
  receipt: Receipt
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
        <DialogTitle class="text-md font-large">Recepta</DialogTitle>
      </DialogHeader>
      <ReceiptForm :receipt="receipt" @confirm="handleSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
