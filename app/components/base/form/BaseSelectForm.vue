<script setup lang="ts" generic="T">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label?: string
  placeholder?: string
  size?: 'sm' | 'default'
  apiUrl?: string
  options?: T[]
  optionValue?: (option: T) => string
  optionLabel?: (option: T) => string
  immediateFetch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Wybierz...',
  size: 'default',
  immediateFetch: false,
})

const { value, errorMessage, handleChange } = useField<string>(() => props.name)

const { data } = useAPI<{ data: T[] }>(props.apiUrl ?? '', {
  immediate: props.immediateFetch && !!props.apiUrl,
})

const mergedOptions = computed(() => {
  if (props.options) return props.options
  return data.value?.data ?? []
})
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label v-if="label" :for="name" class="px-2 text-xs font-medium text-muted-foreground">
      {{ label }}
    </Label>
    <Select :model-value="value" @update:model-value="handleChange">
      <SelectTrigger :id="name" class="w-full rounded-md" :size="size">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in mergedOptions"
          :key="optionValue ? optionValue(option) : String(option)"
          :value="optionValue ? optionValue(option) : String(option)"
        >
          {{ optionLabel ? optionLabel(option) : String(option) }}
        </SelectItem>
      </SelectContent>
    </Select>
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
