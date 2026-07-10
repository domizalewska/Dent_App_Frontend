<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HoursSummary } from '~/types'
import { useHoursTypeMeta } from '~/composables/statistics/useHoursTypeMeta'

interface Props {
  summary?: HoursSummary
  pending?: boolean
}

const props = defineProps<Props>()

const { types, labels, icons, solidText } = useHoursTypeMeta()

const cards = computed(() =>
  types.map((type) => ({
    key: type,
    label: labels[type],
    icon: icons[type],
    colorClass: solidText[type],
    value: props.summary?.[type] ?? 0,
  })),
)
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <div
      v-for="card in cards"
      :key="card.key"
      class="rounded-lg border border-border bg-secondary p-4"
    >
      <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Icon :icon="card.icon" :class="['size-4', card.colorClass]" />
        {{ card.label }}
      </div>

      <div v-if="props.pending" class="mt-2 h-7 w-16 animate-pulse rounded bg-muted" />
      <div v-else class="mt-1.5 text-2xl font-bold">
        {{ card.value }} <span class="text-sm font-normal text-muted-foreground">godz.</span>
      </div>
    </div>
  </div>
</template>
