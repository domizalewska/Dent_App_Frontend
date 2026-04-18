<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label: string
  disabled?: boolean
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<boolean>(() => props.name)
</script>

<template>
  <div class="space-y-1.5">
    <div class="flex items-center gap-3">
      <Switch
        :id="name"
        v-model="value"
        :disabled="disabled"
      />
      <Label :for="name" class="text-xs font-medium text-muted-foreground">{{ label }}</Label>
    </div>
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
