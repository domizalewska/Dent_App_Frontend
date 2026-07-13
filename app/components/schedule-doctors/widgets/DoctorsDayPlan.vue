<script setup lang="ts">
import type { DoctorsScheduleResponse } from '~/types'
import AppointmentDayCalendar from '~/components/base/AppointmentDayCalendar.vue'

interface Props {
  schedule: DoctorsScheduleResponse
  date: Date
}

const props = defineProps<Props>()
const emit = defineEmits<{ appointmentClick: [uuid: string] }>()
</script>

<template>
  <div class="max-h-[600px] overflow-y-auto overflow-x-auto border border-border rounded-xl">
    <div class="grid" :style="{ gridTemplateColumns: `repeat(${schedule.doctors.length}, 1fr)` }">
      <div
        v-for="(doctor, i) in schedule.doctors"
        :key="doctor.uuid"
        class="border-r border-border last:border-r-0"
      >
        <AppointmentDayCalendar
          :title="`${doctor.first_name} ${doctor.last_name}`"
          :subtitle="doctor.job_position?.name"
          :appointments="schedule.appointments_by_doctor[doctor.uuid] ?? []"
          :date="date"
          :show-axis="i === 0"
          color-by="patient"
          @appointment-click="(uuid) => emit('appointmentClick', uuid)"
        />
      </div>
    </div>
  </div>
</template>
