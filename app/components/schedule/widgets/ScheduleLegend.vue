<script setup lang="ts">
import { CalendarType } from '~/types'

const { getColor } = useScheduleColors()

const entries = [
  { type: CalendarType.WORK, label: 'Praca' },
  { type: CalendarType.VACATION, label: 'Urlop' },
  { type: CalendarType.SICK_LEAVE, label: 'L4' },
  { type: CalendarType.EXAMINATION, label: 'Badanie' },
  { type: CalendarType.OTHER, label: 'Inne' },
]
</script>

<template>
  <div class="flex items-center gap-4 text-sm text-muted-foreground">
    <div v-for="entry in entries" :key="entry.type" class="flex items-center gap-1.5">
      <span class="size-3 rounded-sm shrink-0" :style="{ backgroundColor: getColor(entry.type) }" />
      <span class="text-sm">{{ entry.label }}</span>
    </div>
  </div>
</template>
