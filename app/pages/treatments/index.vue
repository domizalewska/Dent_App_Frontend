<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseSkeletonHeader from '~/components/base/skeleton/header/BaseSkeletonHeader.vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { useDialog } from '~/composables/useDialog'
import type { TreatmentType } from '~/types/treatments/treatments.type'
import { getTreatmentsColumns, TreatmentsEndpoints, treatmentsKey } from '~/features/treatments'
import { useTreatments } from '~/composables/treatments/useTreatments'
import TreatmentsDialog from '~/components/treatments/dialog/TreatmentsDialog.vue'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()
const { open, close, activeComponent, activeProps } = useDialog()
const { deleteRecord } = useTreatments()
const treatmentsColumns = getTreatmentsColumns(deleteRecord)

function addOpenDialog() {
  open(TreatmentsDialog)
}

function onEdit(record: TreatmentType) {
  open(TreatmentsDialog, { isEdit: true, initialValues: record })
}

const { globalSearch, paramsData, setPage, setSort, sortingState, fullFilterList, setSearch } =
  usePagination({
    stateKey: treatmentsKey,
    initialSort: 'created_at,desc',
  })

const { data: treatmentsData, status } = await usePaginatedAPI<TreatmentType>(
  TreatmentsEndpoints.BASE,
  {
    key: treatmentsKey,
    paramsData,
  },
)

set([{ name: 'Usługi', link: '/treatments' }])
resetHeader()
setHeader('Usługi')
</script>
<template>
  <Card class="h-full">
    <BaseSkeletonHeader v-if="status === 'pending'" />
    <BaseTableSkeleton v-if="status === 'pending'" :columns="4" />

    <div class="flex flex-col px-4">
      <BaseHeader v-if="treatmentsData?.data">
        <template #right>
          <div class="flex gap-2">
            <BaseTableSearch :model-value="globalSearch" @search="setSearch" />
            <BaseExportFile
              :params="fullFilterList"
              :extensions="['xlsx', 'csv', 'pdf']"
              :endpoint="TreatmentsEndpoints.EXPORT"
              file-name="Tabela użytkowników"
            />
            <Button @click="addOpenDialog()">
              <template #default>
                <span class="text-color font-normal">
                  {{ 'Dodaj usługę' }}
                </span>
                <Icon icon="lucide:plus" />
              </template>
            </Button>
          </div>
        </template>
      </BaseHeader>
      <component :is="activeComponent" v-bind="activeProps" @close="close" />
    </div>

    <div class="h-full flex flex-col min-h-0 px-4">
      <DataTable
        v-if="treatmentsData"
        :columns="treatmentsColumns"
        :data="treatmentsData.data"
        :total-items="treatmentsData.pagination.total"
        :current-page="treatmentsData.pagination.current_page"
        :per-page="treatmentsData.pagination.per_page"
        :sorting="sortingState"
        :on-sorting-change="setSort"
        :on-row-click="(row) => onEdit(row)"
        @update:page="setPage"
      />
    </div>
  </Card>
</template>
