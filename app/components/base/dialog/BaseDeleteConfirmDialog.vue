<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Potwierdź usunięcie',
  description: 'Tej operacji nie można cofnąć.',
})

const open = defineModel<boolean>({ default: false })
const emit = defineEmits<{ confirm: [] }>()

function handleConfirm() {
  emit('confirm')
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }} Czy chcesz kontynuować operację?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button variant="outline" size="sm" @click="open = false">Anuluj</Button>
        <Button variant="destructive" size="sm" @click="handleConfirm">Usuń na zawsze</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
