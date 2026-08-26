<script setup lang="ts">
import { CalendarType } from '~/types'
import { defaultScheduleColors } from '~/composables/schedule/useScheduleColors'

const emit = defineEmits(['cancel'])

const { colors, setColor, reset } = useScheduleColors()
const { getLabel } = useScheduleEventMeta

const entries = Object.values(CalendarType).map((type) => ({
  type,
  label: useScheduleEventMeta(type).label,
  icon: useScheduleEventMeta(type).icon,
}))
</script>

<template>
  <div class="flex flex-col h-full divide-y">
    <div class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Kolory typów zdarzeń
      </p>
      <div
        v-for="entry in entries"
        :key="entry.type"
        class="flex items-center justify-between rounded-md border px-3 py-2"
      >
        <div class="flex items-center gap-2">
          <div
            class="size-3 rounded-full shrink-0"
            :style="{ backgroundColor: colors[entry.type] }"
          />
          <component :is="entry.icon" class="size-3.5 text-muted-foreground shrink-0" />
          <span class="text-sm">{{ entry.label }}</span>
        </div>
        <input
          type="color"
          :value="colors[entry.type]"
          class="size-7 cursor-pointer rounded border border-border bg-transparent p-0.5"
          @input="(e) => setColor(entry.type, (e.target as HTMLInputElement).value)"
        />
      </div>
    </div>
    <div class="px-4 py-3 flex items-center justify-between">
      <Button variant="ghost" size="sm" @click="reset">Przywróć domyślne</Button>
      <BaseAcceptDeclineButtons
        accept-title="Zapisz"
        decline-title="Anuluj"
        @submit="emit('cancel')"
        @decline="emit('cancel')"
      />
    </div>
  </div>
</template>
