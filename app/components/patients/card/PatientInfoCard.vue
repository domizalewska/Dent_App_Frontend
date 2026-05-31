<script setup lang="ts">
import type { PatientType } from '~/types'
import PatientInfoFormWidget from '~/components/patients/widgets/PatientInfoFormWidget.vue'
import PatientNextAppointmentWidget from '~/components/patients/widgets/PatientNextAppointmentWidget.vue'
import PatientLastAppointmentWidget from '~/components/patients/widgets/PatientLastAppointmentWidget.vue'

defineProps<{ patient: PatientType }>()
</script>

<template>
  <div class="flex gap-4 mt-4">
    <div class="flex flex-col gap-4 flex-[2]">
      <PatientInfoFormWidget :patient="patient" />
    </div>
    <div class="flex flex-col gap-4 flex-[1]">
      <PatientNextAppointmentWidget :patient="patient" />
      <PatientLastAppointmentWidget :patient="patient" />
    </div>
  </div>
</template>
