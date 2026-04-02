<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { PatientType } from '~/types'
import { patientsColumns, PatientsEndpoints } from '~/features/patients'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()

set([{ name: 'Pacjenci', link: '/patients' }])

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Użytkownicy')

const {
  data: patientsData,
  pending,
  error,
} = await usePaginatedAPI<PatientType>(`${PatientsEndpoints.LIST}`)
</script>

<template>
  <div v-if="pending" class="flex justify-center items-center">
    <BaseDatatableSkeleton />
  </div>
  <div v-else-if="patientsData" class="flex w-full">
    <DataTable v-if="patientsData?.data" :columns="patientsColumns" :data="patientsData.data" />
  </div>
</template>
