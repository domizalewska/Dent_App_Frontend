<script setup lang="ts">
interface Props {
  open: boolean
  blobUrl: string | null
  filename?: string
  loading?: boolean
}

defineProps<Props>()
const emit = defineEmits(['update:open'])
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="flex h-[90vh] max-w-4xl flex-col gap-0 p-0">
      <DialogHeader class="shrink-0 border-b px-6 py-4">
        <DialogTitle class="truncate text-sm font-medium">
          {{ filename }}
        </DialogTitle>
      </DialogHeader>
      <div class="flex-1 overflow-hidden">
        <div v-if="loading" class="flex h-full items-center justify-center">
          <Spinner class="size-6 text-muted-foreground" />
        </div>
        <img
          v-else-if="blobUrl"
          :src="blobUrl"
          :alt="filename"
          class="size-full object-contain"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
