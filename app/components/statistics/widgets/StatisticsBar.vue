<script setup lang="ts">
import type { HoursDistributionItem } from '~/types'
import { useHoursTypeMeta } from '~/composables/statistics/useHoursTypeMeta'

interface Props {
  distribution?: HoursDistributionItem[]
  pending?: boolean
}

const props = defineProps<Props>()

const { labels, solidBg } = useHoursTypeMeta()

const items = computed(() => (props.distribution ?? []).filter((i) => i.hours > 0))
</script>

<template>
  <div>
    <div class="mb-2 text-sm font-medium text-muted-foreground">Podział godzin w miesiącu</div>

    <div v-if="props.pending" class="h-[26px] animate-pulse rounded-lg bg-muted" />

    <div v-else class="flex h-[26px] overflow-hidden rounded-lg">
      <div
        v-for="item in items"
        :key="item.type"
        :style="{ width: `${item.percent}%` }"
        :class="solidBg[item.type]"
        class="flex items-center justify-center text-[11px] text-white"
      >
        {{ item.hours }}h
      </div>
    </div>

    <div class="mt-2 flex gap-4 text-xs text-muted-foreground">
      <div v-for="item in items" :key="item.type" class="flex items-center gap-1.5">
        <span class="size-2.5 rounded-sm" :class="solidBg[item.type]" />
        {{ labels[item.type] }}
      </div>
    </div>
  </div>
</template>
