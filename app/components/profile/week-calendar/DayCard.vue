<script setup lang="ts">
interface Props {
  dayOfWeek: number
  nameOfWeek: string
  slotNumber: number
}

defineProps<Props>()
</script>
<template>
  <Button class="flex flex-1 w-[150px] h-[150px] flex-col items-center" variant="outline">
    <slot>
      <span class="font-medium">{{ nameOfWeek }}</span>
      <span>{{ dayOfWeek }}</span>
      <span class="mt-0.5 text-xs tabular-nums opacity-70">{{ slotNumber }}</span>
    </slot>
  </Button>
</template>
