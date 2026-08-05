<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import AddScheduleEntryDialog from '~/components/schedule/dialog/AddScheduleEntryDialog.vue'
import { useDialog } from '~/composables/useDialog'

interface Props {
  currentTitle: string
  currentView?: string
}

defineProps<Props>()
const emit = defineEmits(['prev', 'next', 'today', 'week', 'month'])

const { open, close, activeProps, activeComponent } = useDialog()
</script>

<template>
  <div
    class="flex w-full flex-col gap-2 px-3 pb-4 pt-4 sm:flex-row sm:items-center sm:justify-between border-b"
  >
    <div class="flex items-center gap-1">
      <Button variant="outline" size="icon-xs" @click="emit('prev')">
        <ChevronLeft />
      </Button>
      <Button variant="outline" size="xs" @click="emit('today')">Dziś</Button>
      <Button variant="outline" size="icon-xs" @click="emit('next')">
        <ChevronRight />
      </Button>
    </div>

    <span class="text-sm font-semibold capitalize text-foreground">
      {{ currentTitle }}
    </span>

    <div class="flex flex-wrap items-center gap-1">
      <ScheduleSettingButton />
      <Button size="xs" variant="outline" @click="open(AddScheduleEntryDialog, {})">
        + Dodaj wpis
      </Button>
      <Button
        size="xs"
        :variant="currentView === 'timeGridWeek' ? 'default' : 'outline'"
        @click="emit('week')"
      >
        Tydzień
      </Button>
      <Button
        size="xs"
        :variant="currentView === 'dayGridMonth' ? 'default' : 'outline'"
        @click="emit('month')"
      >
        Miesiąc
      </Button>
    </div>
  </div>

  <component :is="activeComponent" v-bind="activeProps" @close="close" />
</template>
