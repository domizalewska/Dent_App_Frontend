<script setup lang="ts">
import type { ScheduleEvent } from '~/types'

interface Props {
  entry: ScheduleEvent
  timeText: string
}

const props = defineProps<Props>()
const { icon, label, className } = useScheduleEventMeta(props.entry.type)
</script>

<template>
  <div
    :class="[
      'flex min-w-0 h-full w-full flex-col gap-0.5 rounded px-1 py-0.5 text-white',
      className,
    ]"
  >
    <div class="flex items-center gap-1 font-medium leading-tight">
      <component :is="icon" class="size-3 shrink-0" />
      <span class="truncate text-xs">{{ label }}</span>
    </div>
    <span v-if="timeText" class="text-[10px] opacity-80">{{ timeText }}</span>
    <span v-if="entry.notes" class="truncate text-[10px] opacity-80">{{ entry.notes }}</span>
  </div>
</template>
