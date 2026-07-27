<script setup lang="ts">
import { toRefs } from 'vue'
import { useField } from 'vee-validate'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
  name: string
  label?: string
  placeholder?: string
  modelValue?: string | string[]
  requiredMark?: boolean
  hideLabel?: boolean
  rules?: string
  enableSeconds?: boolean
  enableMinutes?: boolean
  range?: boolean
  modelType?: string
  format?: string
  inputDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  enableMinutes: true,
  enableSeconds: false,
  placeholder: undefined,
  modelValue: undefined,
  label: undefined,
  rules: undefined,
  range: false,
  modelType: 'HH:mm:ss',
  format: 'HH:mm',
})

const { rules, label: labelRef } = toRefs(props)

const { value: fieldValue, errorMessage } = useField<string | string[]>(props.name, rules, {
  syncVModel: true,
  validateOnValueUpdate: true,
  keepValueOnUnmount: true,
  label: labelRef,
})
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
      v-model="fieldValue"
      :model-type="modelType"
      :format="format"
      locale="pl"
      cancel-text="Anuluj"
      select-text="Wybierz"
      :time-picker="true"
      :time-picker-24-hour="true"
      :range="range"
      :enable-seconds="enableSeconds"
      :enable-minutes="enableMinutes"
    >
      <template #dp-input="{ value: inputValue }">
        <Input
          :id="name"
          :value="inputValue"
          :placeholder="placeholder"
          :disabled="inputDisabled"
          :aria-invalid="!!errorMessage"
          class="rounded-xl cursor-pointer"
          readonly
        />
      </template>
    </VueDatePicker>
    <p v-if="errorMessage" class="text-xs text-destructive px-2">{{ errorMessage }}</p>
  </div>
</template>
