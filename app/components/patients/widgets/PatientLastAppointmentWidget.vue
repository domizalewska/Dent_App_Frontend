<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import type { CalendarEventType, PatientType } from '~/types'
import { formatDateToString } from '~/utils/formatDate'

interface Props {
  patient: PatientType
  lastAppointment?: CalendarEventType
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden rounded-lg">
    <CardHeader class="px-6 pb-2 pt-4">
      <CardTitle class="text-xs font-medium text-muted-foreground tracking-wide uppercase">
        Ostatnia wizyta
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-4">
      <div v-if="lastAppointment" class="flex items-center gap-3 rounded-lg border p-3">
        <Clock class="size-4 shrink-0 text-muted-foreground" />
        <div class="flex flex-col gap-0.5">
          <span class="text-sm font-medium">{{ lastAppointment.name }}</span>
          <span class="text-xs text-muted-foreground">
            {{ formatDateToString(lastAppointment.date, 'dd MMMM yyyy') }}
            <template v-if="lastAppointment.start_time">
              {{ lastAppointment.start_time.slice(0, 5) }}
            </template>
          </span>
          <span v-if="lastAppointment.users[0]" class="text-xs text-muted-foreground">
            {{ lastAppointment.users[0].first_name }} {{ lastAppointment.users[0].last_name }}
          </span>
        </div>
      </div>
      <p v-else class="text-xs text-muted-foreground">Brak poprzednich wizyt</p>
    </CardContent>
  </Card>
</template>
