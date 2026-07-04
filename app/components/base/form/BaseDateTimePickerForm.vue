<script setup lang="ts">
import { useField } from 'vee-validate'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  name: string
  label: string
  placeholder?: string
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  step: 60,
})

const { value, errorMessage, handleChange } =
  useField<string>(() => props.name)
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label :for="name" class="px-2 text-xs text-muted-foreground">
      {{ label }}
    </Label>

    <Input
      :id="name"
      type="time"
      :step="step"
      :model-value="value"
      :placeholder="placeholder"
      class="bg-background appearance-none rounded-xl [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      @update:model-value="(val) => handleChange(String(val ?? ''))"
    />

    <p v-if="errorMessage" class="text-xs text-destructive">
      {{ errorMessage }}
    </p>
  </div>
</template>