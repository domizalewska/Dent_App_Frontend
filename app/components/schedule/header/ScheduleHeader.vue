<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import ScheduleEventDialog from '~/components/schedule/dialog/ScheduleEventDialog.vue'
import { useDialog } from '~/composables/useDialog'
import { UsersEndpoints } from '~/features/users'
import type { User } from '~/types'

interface Props {
  currentTitle: string
  currentView?: string
  showSettings?: boolean
  showMonth?: boolean
  showSelect?: boolean
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
      <BaseMultiselect
        v-if="showSelect"
        name="doctors"
        api-key="schedule-header-doctors"
        size="sm"
        :api="UsersEndpoints.LIST_SELECT"
        :option-value="(u: User) => u.uuid"
        :option-label="(u: User) => `${u.first_name} ${u.last_name}`"
        :option-avatar="(u: User) => u.avatar_path ?? u.profile_picture"
        placeholder="Dodaj uczestników..."
        hide-label
      />
      <ScheduleSettingButton v-if="showSettings" />
      <Button size="xs" variant="outline" @click="open(ScheduleEventDialog, {})">
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
        v-if="showMonth"
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
