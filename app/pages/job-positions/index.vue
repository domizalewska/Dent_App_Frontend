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
import JobPositionAddDialog from '~/components/job-positions/dialog/JobPositionAddDialog.vue'
import JobPositionEditDialog from '~/components/job-positions/dialog/JobPositionEditDialog.vue'
import { JobPositionTable } from '~/symbols'
import { useDialog } from '~/composables/useDialog'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()
set([{ name: 'Stanowiska pracy', link: '/job-positions' }])
resetHeader()
setHeader('Stanowiska pracy')

const { open, close, activeProps, activeComponent } = useDialog()

const {
  data: jobPositionsData,
  pending,
  error,
} = await usePaginatedAPI<JobPosition>(`${JobPositionsEndpoints().TABLE}`, {
  key: JobPositionTable.toString(),
})

function addDialogOpen() {
  open(JobPositionAddDialog)
}

function onEdit(record: JobPosition) {
  open(JobPositionEditDialog, { record })
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
    <component :is="activeComponent" v-bind="activeProps" @close="close" />
    <div class="h-full flex flex-col min-h-0">
      <DataTable
        v-if="jobPositionsData?.data"
        :columns="jobPositionsColumns"
        :data="jobPositionsData.data"
        :on-row-click="(row) => onEdit(row)"
      />
    </div>
  </div>
</template>
