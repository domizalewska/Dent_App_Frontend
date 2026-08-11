<script setup lang="ts">
import { useField } from 'vee-validate'
import { BriefcaseMedicalIcon, PalmtreeIcon, ThermometerIcon } from 'lucide-vue-next'
import { CalendarType } from '~/types'

const { value } = useField<CalendarType>('type')

const options = [
  {
    value: CalendarType.WORK,
    label: 'Praca',
    icon: BriefcaseMedicalIcon,
    color: 'text-indigo-500',
  },
  { value: CalendarType.VACATION, label: 'Urlop', icon: PalmtreeIcon, color: 'text-amber-500' },
  { value: CalendarType.SICK_LEAVE, label: 'L4', icon: ThermometerIcon, color: 'text-red-500' },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm font-medium transition-colors"
      :class="
        value === opt.value
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-border text-muted-foreground hover:bg-accent'
      "
      @click="value = opt.value"
    >
      <component :is="opt.icon" class="size-5" :class="value === opt.value ? '' : opt.color" />
      {{ opt.label }}
    </button>
  </div>
</template>
