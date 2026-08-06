<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRefs, computed, ref } from 'vue'
import { DateFormatter, parseDate } from '@internationalized/date'
import type { DateValue } from 'reka-ui'
import { CalendarIcon } from 'lucide-vue-next'

interface Props {
  name: string
  label?: string
  placeholder?: string
  requiredMark?: boolean
  hideLabel?: boolean
  rules?: string
  size?: 'sm' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
})
const { rules, label: labelRef } = toRefs(props)

const { value, errorMessage } = useField<string>(props.name, rules, {
  syncVModel: true,
  validateOnValueUpdate: true,
  keepValueOnUnmount: true,
  label: labelRef,
})

const open = ref(false)

const df = new DateFormatter('pl-PL', { dateStyle: 'long' })

const calendarValue = computed<DateValue | undefined>({
  get() {
    if (!value.value) return undefined
    try {
      return parseDate(value.value)
    } catch {
      return undefined
    }
  },
  set(v) {
    value.value = v ? v.toString() : ''
    open.value = false
  },
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
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          :id="name"
          variant="outline"
          :aria-invalid="!!errorMessage"
          class="w-full justify-start rounded-xl font-normal"
          :class="[!calendarValue ? 'text-muted-foreground' : '', size === 'sm' ? 'h-8 text-xs' : '']"
        >
          <CalendarIcon class="size-4 shrink-0" />
          {{ calendarValue ? df.format(calendarValue.toDate('Europe/Warsaw')) : (placeholder ?? 'Wybierz datę') }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0" align="start">
        <Calendar v-model="calendarValue" locale="pl" initial-focus />
      </PopoverContent>
    </Popover>
    <p v-if="errorMessage" class="text-xs text-destructive px-2">{{ errorMessage }}</p>
  </div>
</template>
