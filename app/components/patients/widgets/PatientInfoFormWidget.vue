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
    <CardHeader class="px-6 pb-0 pt-4">
      <CardTitle class="text-xs font-medium text-muted-foreground tracking-wide uppercase">
        Dane osobowe
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-3">
      <PatientForm :initial-values="patient" @submit="onSubmit" />
    </CardContent>
  </Card>
</template>
