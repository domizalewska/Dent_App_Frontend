<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useField } from 'vee-validate'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

interface TimeModel {
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}

interface Props {
  name: string
  label?: string
  placeholder?: string
  modelValue?: string
  requiredMark?: boolean
  hideLabel?: boolean
  rules?: string
  enableSeconds?: boolean
  enableMinutes?: boolean
  range?: boolean
  inputDisabled?: boolean
  size?: 'sm' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  enableMinutes: true,
  enableSeconds: false,
  range: false,
  size: 'default',
})

const { rules, label: labelRef } = toRefs(props)

const { value: fieldValue, errorMessage } = useField<string>(props.name, rules, {
  syncVModel: true,
  validateOnValueUpdate: true,
  keepValueOnUnmount: true,
  label: labelRef,
})

const timeModel = computed<TimeModel | null>(() => {
  if (!fieldValue.value) return null
  const parts = fieldValue.value.split(':')
  if (parts.length < 2) return null
  return {
    hours: parseInt(parts[0]) || 0,
    minutes: parseInt(parts[1]) || 0,
    seconds: parts[2] ? parseInt(parts[2]) || 0 : 0,
    milliseconds: 0,
  }
})

function onUpdate(value: TimeModel | null) {
  if (!value) {
    fieldValue.value = ''
    return
  }
  const h = String(value.hours).padStart(2, '0')
  const m = String(value.minutes).padStart(2, '0')
  const s = String(value.seconds).padStart(2, '0')
  fieldValue.value = `${h}:${m}:${s}`
}

function formatTime(value: TimeModel | null) {
  if (!value || value.hours === undefined) return ''
  const h = String(value.hours).padStart(2, '0')
  const m = String(value.minutes).padStart(2, '0')
  return `${h}:${m}`
}
</script>

<template>
  <div class="space-y-1.5">
    <slot name="label">
      <Label
        v-if="label && !hideLabel"
        :for="name"
        class="px-2 text-xs font-medium text-muted-foreground"
      >
        {{ label }}{{ requiredMark ? '*' : '' }}
      </Label>
    </slot>
    <VueDatePicker
      v-bind="$attrs"
      :model-value="timeModel"
      :format="formatTime"
      auto-apply
      :time-picker="true"
      :time-picker-24-hour="true"
      :range="range"
      :enable-seconds="enableSeconds"
      :enable-minutes="enableMinutes"
      @update:model-value="onUpdate"
    >
      <template #dp-input="{ value: inputValue }">
        <Input
          :id="name"
          :value="inputValue"
          :placeholder="placeholder ?? 'HH:mm'"
          :disabled="inputDisabled"
          :aria-invalid="!!errorMessage"
          :class="['rounded-md cursor-pointer', size === 'sm' ? 'h-8 text-xs' : '']"
          readonly
        />
      </template>
    </VueDatePicker>
    <p v-if="errorMessage" class="text-xs text-destructive px-2">{{ errorMessage }}</p>
  </div>
</template>
