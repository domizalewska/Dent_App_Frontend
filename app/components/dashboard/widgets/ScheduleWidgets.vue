<script setup lang="ts">
import { ArrowRightIcon, ClockIcon } from 'lucide-vue-next'

interface Appointment {
  id: string | number
  time: string
  patientName: string
  procedure: string
  doctorName: string
  room: string
}

defineProps<{
  appointments: Appointment[]
  loading?: boolean
}>()
</script>

<template>
  <div class="rounded-2xl border border-border bg-card shadow-sm overflow-hidden w-full">
    <div class="flex items-center justify-between px-6 py-5">
      <div class="flex items-center gap-2">
        <ClockIcon class="size-5 text-muted-foreground" />
        <h3 class="text-lg font-semibold text-foreground">Grafik na dziś</h3>
      </div>
      <NuxtLink
        to="/schedule"
        class="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Pełny grafik
        <ArrowRightIcon class="size-4" />
      </NuxtLink>
    </div>
    <div class="border-t border-border" />
    <div v-if="loading" class="px-6 py-8 space-y-4">
      <div v-for="i in 4" :key="i" class="h-14 rounded-md bg-muted animate-pulse" />
    </div>

    <div
      v-else-if="appointments.length === 0"
      class="px-6 py-10 text-center text-muted-foreground text-sm"
    >
      Brak wizyt zaplanowanych na dziś.
    </div>

    <div v-else>
      <ScheduleItems
        v-for="appt in appointments"
        :key="appt.id"
        :time="appt.time"
        :patient-name="appt.patientName"
        :procedure="appt.procedure"
        :doctor-name="appt.doctorName"
        :room="appt.room"
      />
    </div>
  </div>
</template>
