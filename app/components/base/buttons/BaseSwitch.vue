<script setup lang="ts">
interface Props {
  label: string
  disabled?: boolean
}

defineProps<Props>()

const model = defineModel<boolean>()
</script>

<template>
  <div class="flex items-center gap-3">
    <Switch v-model:checked="model" :disabled="disabled" />
    <Label class="text-xs font-medium text-muted-foreground">{{ label }}</Label>
  </div>
</template>
