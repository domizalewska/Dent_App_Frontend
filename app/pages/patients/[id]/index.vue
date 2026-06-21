<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { PatientType } from '~/types'
import { useAPI } from '~/composables/useAPI'
import { PatientsEndpoints } from '~/features/patients'
import { patientDetailKey } from '~/composables/patient/key'

definePageMeta({
  layout: 'dashboard',
})

const { params } = useRoute()
const { id } = params as { id: string }

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Pacjent')

const { set } = useBreadcrumbs()

set([{ name: 'Pacjent', link: '/patients' }])

const {
  data: patientData,
  pending,
  error,
} = await useAPI<PatientType>(PatientsEndpoints(id).PATIENT_DETAILS, { key: patientDetailKey(id) })
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center px-6">
    <PatientTabs v-if="patientData" :patient="patientData" />
  </div>
</template>
