<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { JobPosition } from '~/types/job-position/job-position.type'
import { jobPositionsColumns } from '~/features/job-positions/job-positions.columns'
import { JobPositionsEndpoints } from '~/features/job-positions'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Stanowiska pracy', link: '/job-positions' }])

resetHeader()
setHeader('Stanowiska pracy')

const {
  data: jobPositionsData,
  pending,
  error,
} = await usePaginatedAPI<JobPosition>(`${JobPositionsEndpoints().LIST}`)
</script>

<template>
  <div class="flex w-full">
    <DataTable
      v-if="jobPositionsData?.data"
      :columns="jobPositionsColumns"
      :data="jobPositionsData.data"
    />
  </div>
</template>
