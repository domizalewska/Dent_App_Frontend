<script setup lang="ts" generic="T">
import { useField } from 'vee-validate'

interface Props {
  name: string
  label: string
  placeholder?: string
  api?: string
  options?: T[]
  optionValue: (option: T) => string
  optionLabel: (option: T) => string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Wybierz...',
})

const { value, errorMessage, handleChange } = useField<string>(() => props.name)

const { data } = props.api ? useAPI<{ data: T[] }>(props.api) : { data: ref(null) }

const mappedOptions = computed(() => {
  if (props.options) {
    return props.options.map((e) => ({
      uuid: props.optionValue(e),
      name: props.optionLabel(e),
    }))
  }
  return (data.value?.data ?? []).map((e) => ({
    uuid: props.optionValue(e),
    name: props.optionLabel(e),
  }))
})
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label :for="name" class="px-2 text-xs font-medium text-muted-foreground">{{ label }}</Label>
    <Select :model-value="value" @update:model-value="handleChange">
      <SelectTrigger :id="name" class="w-full rounded-xl">
        <SelectValue :placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in mappedOptions"
          v-bind="$attrs"
          :key="option.uuid"
          :value="option.uuid"
        >
          {{ option.name }}
        </SelectItem>
      </SelectContent>
    </Select>
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
