<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useField, useFormContext } from 'vee-validate'
import IntlTelInput from '@intl-tel-input/vue/with-utils'
import 'intl-tel-input/styles'

interface Props {
  name: string
  modelValue?: string
  label?: string
  rules?: string
  hideLabel?: boolean
  requiredMark?: boolean
}

const props = defineProps<Props>()
const { rules } = toRefs(props)

const { errorMessage } = useField<string>(props.name, rules, {
  validateOnValueUpdate: true,
  keepValueOnUnmount: true,
  label: props.label,
})

const { setFieldValue, values } = useFormContext()

const currentValue = computed(() => (values as Record<string, string>)[props.name] ?? '')

function onChangeNumber(number: string) {
  setFieldValue(props.name, number ? number.replace(/^\+/, '') : '')
}

const europeanCountries = [
  'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cy', 'cz',
  'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'is', 'ie', 'it',
  'xk', 'lv', 'li', 'lt', 'lu', 'mt', 'md', 'mc', 'me', 'nl',
  'mk', 'no', 'pl', 'pt', 'ro', 'ru', 'sm', 'rs', 'sk', 'si',
  'es', 'se', 'ch', 'ua', 'gb', 'va',
]
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label
      v-if="label && !hideLabel"
      :for="name"
      class="px-2 text-xs font-medium text-muted-foreground"
    >
      {{ label }}{{ requiredMark ? '*' : '' }}
    </Label>
    <IntlTelInput
      :initial-value="currentValue"
      :input-props="{ id: name, name, placeholder: '000 000 000' }"
      :only-countries="europeanCountries"
      :country-order="['pl', 'de']"
      initial-country="pl"
      class="w-full"
      @change-number="onChangeNumber"
    />
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
