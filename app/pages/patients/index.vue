<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { PatientType } from '~/types'
import { patientsColumns, PatientsEndpoints } from '~/features/patients'
import BaseSkeletonHeader from '~/components/base/skeleton/header/BaseSkeletonHeader.vue'
import BaseTableSkeleton from '~/components/base/skeleton/table/BaseTableSkeleton.vue'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseHeader from '~/components/base/header/BaseHeader.vue'
import BaseExportFile from '~/components/base/export/BaseExportFile.vue'
import { useDialog } from '~/composables/useDialog'
import { Icon } from '@iconify/vue'
import PatientDialog from '~/components/patients/dialog/PatientDialog.vue'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()

const { open, close, activeComponent, activeProps } = useDialog()

set([{ name: 'Pacjenci', link: '/patients' }])

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Pacjenci')

const {
  data: patientsData,
  pending,
  error,
} = await usePaginatedAPI<PatientType>(`${PatientsEndpoints().TABLE}`)

async function addOpenDialog() {
  open(PatientDialog)
}
</script>

<template>
  <div class="h-full">
    <div v-if="pending" class="flex justify-center items-center">
      <BaseSkeletonHeader />
      <BaseTableSkeleton :columns="4" />
    </div>
    <div class="flex flex-col">
      <BaseHeader v-if="patientsData?.data">
        <template #right>
          <div class="flex gap-2">
            <BaseTableSearch />
            <BaseExportFile
              :extensions="['xlsx', 'csv', 'pdf']"
              :endpoint="`${PatientsEndpoints().EXPORT}`"
              file-name="Tabela pacjentów"
            />
            <Button @click="addOpenDialog()">
              <template #default>
                <span class="text-color font-normal">
                  {{ 'Dodaj wpis' }}
                </span>
                <Icon icon="lucide:plus" />
              </template>
            </Button>
          </div>
        </template>
      </BaseHeader>
    </div>
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <div class="h-full flex flex-col min-h-0">
      <DataTable v-if="patientsData?.data" :columns="patientsColumns" :data="patientsData.data" />
    </div>
  </div>
</template>
