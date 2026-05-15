<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Czy jesteś pewny?',
  description: 'Tej operacji nie można cofnąć.',
  confirmLabel: 'Usuń',
  cancelLabel: 'Anuluj',
})

const emit = defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <AlertDialog open>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription>{{ description }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('cancel')">{{ cancelLabel }}</AlertDialogCancel>
        <AlertDialogAction @click="emit('confirm')">{{ confirmLabel }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
