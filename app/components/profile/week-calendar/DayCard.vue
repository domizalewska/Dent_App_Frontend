<script setup lang="ts">
interface Props {
  dayOfWeek: number
  nameOfWeek: string
  slotNumber: number
  isSelected?: boolean
}

defineProps<Props>()
</script>

<template>
  <button
    type="button"
    class="flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs transition-colors"
    :class="isSelected ? 'bg-foreground text-background' : 'hover:bg-muted/50'"
  >
    <span class="font-medium">{{ nameOfWeek }}</span>
    <span :class="isSelected ? 'opacity-70' : 'text-muted-foreground'">{{ dayOfWeek }}</span>
    <span
      class="mt-0.5 text-xs tabular-nums"
      :class="isSelected ? 'opacity-70' : 'text-muted-foreground'"
    >
      {{ slotNumber }} slots
    </span>
  </button>
</template>
