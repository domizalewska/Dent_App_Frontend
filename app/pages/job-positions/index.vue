<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { JobPosition } from '~/types/job-position/job-position.type'
import { jobPositionsColumns } from '~/features/job-positions/job-positions.columns'
import { JobPositionsEndpoints } from '~/features/job-positions'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseIconButton from '~/components/base/buttons/BaseIconButton.vue'
import { Icon } from '@iconify/vue'
import JobPositionAddDialog from '~/components/job-positions/JobPositionAddDialog.vue'
import { useOverlay } from '#ui/composables'

definePageMeta({
  layout: 'dashboard',
})

const overlay = useOverlay()
const addDialog = overlay.create(JobPositionAddDialog)

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Stanowiska pracy', link: '/job-positions' }])

resetHeader()
setHeader('Stanowiska pracy')

const {
  data: jobPositionsData,
  pending,
  error,
} = await usePaginatedAPI<JobPosition>(`${JobPositionsEndpoints().TABLE}`)

function addDialogOpen() {
  addDialog.open()
}
</script>

<template>
  <div class="h-full">
    <ClientOnly>
      <Teleport to="#header-page-buttons">
        <BaseIconButton tooltip="Dodaj stanowisko" side="bottom" @click="addDialogOpen()">
          <template #default>
            <Icon icon="lucide:plus" />
          </template>
        </BaseIconButton>
      </Teleport>
    </ClientOnly>
    <div class="flex flex-col">
      <BaseHeader>
        <template #right>
          <div class="flex gap-2">
            <BaseTableSearch />
            <BaseExportFile
              :extensions="['xlsx', 'csv', 'pdf']"
              :endpoint="`${JobPositionsEndpoints().EXPORT}`"
              file-name="Tabela stanowisk"
            />
          </div>
        </template>
      </BaseHeader>
    </div>
    <div class="h-full flex flex-col min-h-0">
      <DataTable
        v-if="jobPositionsData?.data"
        :columns="jobPositionsColumns"
        :data="jobPositionsData.data"
      />
    </div>
  </div>
</template>
