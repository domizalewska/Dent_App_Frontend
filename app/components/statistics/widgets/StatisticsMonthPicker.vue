<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { formatDateToString, isCurrentMonth } from '~/utils/formatDate'

const { period } = useStatisticsPeriod()

const monthLabel = computed(() =>
  formatDateToString(new Date(period.value.year, period.value.month - 1), 'LLLL'),
)

const atCurrentMonth = computed(() => isCurrentMonth(period.value.year, period.value.month))

const YEAR_RANGE_START = 2020
const yearOptions = Array.from(
  { length: new Date().getFullYear() - YEAR_RANGE_START + 1 },
  (_, i) => YEAR_RANGE_START + i,
)

function goPrev() {
  const { year, month } = period.value
  period.value = month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 }
}

function goNext() {
  if (atCurrentMonth.value) return
  const { year, month } = period.value
  period.value = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 }
}

function setYear(year: string) {
  period.value = { ...period.value, year: Number(year) }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Button variant="outline" size="icon" aria-label="Poprzedni miesiąc" @click="goPrev">
      <ChevronLeft class="size-4" />
    </Button>

    <div
      class="flex h-[34px] min-w-[90px] items-center justify-center rounded-md border border-border bg-secondary px-3.5 text-sm capitalize text-foreground"
    >
      {{ monthLabel }}
    </div>

    <Button
      variant="outline"
      size="icon"
      :disabled="atCurrentMonth"
      aria-label="Następny miesiąc"
      @click="goNext"
    >
      <ChevronRight class="size-4" />
    </Button>

    <div class="mx-1 h-6 w-px bg-border" />

    <Select :model-value="String(period.year)" @update:model-value="setYear">
      <SelectTrigger class="h-[34px] w-[84px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="y in yearOptions" :key="y" :value="String(y)">
          {{ y }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
