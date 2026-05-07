<script setup lang="ts">
import PatientForm from '~/components/patients/form/PatientForm.vue'
import type { PatientType } from '~/types'

interface Props {
  patient: PatientType
}

const props = defineProps<Props>()

const { editRecord } = usePatient()

async function onSubmit(values: PatientType) {
  await editRecord(props.patient.uuid, values)
}
</script>
<template>
  <Card class="overflow-hidden rounded-lg col-span-2">
    <CardContent class="px-6 pt-4">
      <PatientForm :initial-values="patient" @submit="onSubmit" />
    </CardContent>
  </Card>
</template>
