<script setup lang="ts">
import { useField } from 'vee-validate'
import { Textarea } from '~/components/ui/textarea'

interface Props {
  name: string
  label: string
  placeholder: string
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<string>(() => props.name)
</script>

<template>
  <div class="space-y-1.5">
    <Label :for="name" class="px-2 text-xs font-medium text-muted-foreground">{{ label }}</Label>
    <Textarea
      :id="name"
      v-model="value"
      :name="name"
      :placeholder="placeholder"
      :aria-invalid="!!errorMessage"
      class="rounded-xl placeholder:text-sm resize-none"
    />
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
