<script setup lang="ts">
import { ref } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import { generateMockDays } from '~/mock/days/mockDays'
import { generateMockTimes } from '~/mock/times/mockTimes'
import type { Day, Time } from '~/types'

const cards = ref<Day[]>(generateMockDays())
const times = ref<Time[]>([])
const selectedDayId = ref<string | null>(null)

function onDayClick(day: Day) {
  selectedDayId.value = day.uuid
  times.value = generateMockTimes()
}
</script>

<template>
  <div class="border-b">
    <div class="border-b px-4 py-2">
      <span class="flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
        <CalendarIcon class="size-3" aria-hidden="true" />
        Dostępność w tym tygodniu
      </span>
    </div>

    <div class="flex border-b">
      <DayCard
        v-for="card in cards"
        :key="card.uuid"
        :day-of-week="card.number"
        :name-of-week="card.name"
        :slot-number="card.slot"
        :is-selected="selectedDayId === card.uuid"
        @click="onDayClick(card)"
      />
    </div>

    <div v-if="selectedDayId" class="px-4 py-3">
      <div class="flex flex-wrap gap-2">
        <HourPanel v-for="time in times" :key="time.uuid" :time-text="time.time" />
      </div>
    </div>
  </div>
</template>
