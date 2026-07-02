<script setup lang="ts">
import { useField } from 'vee-validate'
import type { DateValue } from '@internationalized/date'
import { getLocalTimeZone, parseDate } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'

interface Props {
  name: string
  label: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Wybierz datę',
})

const { value, errorMessage, handleChange } =
  useField<string>(() => props.name)

const date = ref<DateValue | undefined>()

watch(value, (v) => {
  date.value = v ? parseDate(v) : undefined
}, { immediate: true })

const df = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const displayValue = computed(() => {
  if (!date.value) return ''
  return df.format(date.value.toDate(getLocalTimeZone()))
})

function onSelect(val: DateValue | undefined, close: () => void) {
  date.value = val

  if (!val) {
    handleChange('')
    close()
    return
  }

  handleChange(
    `${val.year}-${String(val.month).padStart(2, '0')}-${String(val.day).padStart(2, '0')}`
  )

  close()
}
</script>
<template>
  <div class="w-full space-y-1.5">
    <Label :for="name" class="px-2 text-xs text-muted-foreground">
      {{ label }}
    </Label>

    <Popover v-slot="{ close }">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          class="w-full justify-start text-left font-normal rounded-xl"
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {{ displayValue || placeholder }}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="w-[320px] p-0" align="start">
        <Calendar
          :model-value="date"
          locale="pl-PL"
          layout="month-and-year"
          :week-starts-on="1"
          initial-focus
          @update:model-value="(val) => onSelect(val, close)"
        />
      </PopoverContent>
    </Popover>

    <p v-if="errorMessage" class="text-xs text-destructive">
      {{ errorMessage }}
    </p>
  </div>
</template>