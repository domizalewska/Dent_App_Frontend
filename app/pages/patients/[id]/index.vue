<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { User } from '~/types'
import { useAPI } from '~/composables/useAPI'
import { PatientsEndpoints } from '~/features/patients'

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
} = await useAPI<User>(PatientsEndpoints(id).PATIENT_DETAILS)
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex flex-col w-[700px]">
      <ProfileTabs v-if="patientData" :user="patientData" />
    </div>
  </div>
</template>
