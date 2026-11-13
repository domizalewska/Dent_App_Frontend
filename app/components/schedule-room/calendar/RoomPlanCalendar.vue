<script setup lang="ts">
import type { CalendarEventType, RoomType } from '~/types'

interface Props {
  rooms: RoomType[]
  appointments: CalendarEventType[]
  date: Date
}

const props = defineProps<Props>()
const emit = defineEmits<{ eventClick: [uuid: string] }>()
</script>

<template>
  <div class="rooms-day-plan-wrapper">
    <div class="rooms-day-plan">
      <div v-for="(room, i) in rooms" :key="room.uuid" class="rooms-day-plan__col">
        <div class="p-4 text-sm text-muted-foreground">{{ room.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rooms-day-plan-wrapper {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  overflow-x: auto;
}

.rooms-day-plan {
  display: grid;
  grid-template-columns: repeat(v-bind('rooms.length'), 1fr);
  min-width: 0;
}

.rooms-day-plan__col {
  border-right: 1px solid hsl(var(--border));
}

.rooms-day-plan__col:last-child {
  border-right: none;
}
</style>
