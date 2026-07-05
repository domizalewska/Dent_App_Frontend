<script setup lang="ts">
import { getUsersColumns, UsersEndpoints } from '~/features/users'
import { Icon } from '@iconify/vue'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseSkeletonHeader from '~/components/base/skeleton/header/BaseSkeletonHeader.vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { useDialog } from '~/composables/useDialog'
import UsersDialog from '~/components/users/dialog/UsersDialog.vue'
import { usersKey } from '~/features/users'
import type { TreatmentType } from '~/types/treatments/treatments.type'
import { TreatmentsEndpoints } from '~/features/treatments'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()
const { open, close, activeComponent, activeProps } = useDialog()
const { deactivateUser } = useUser()
const usersColumns = getUsersColumns(deactivateUser)

async function addOpenDialog() {
  open(UsersDialog)
}

const { globalSearch, paramsData, setPage, setSort, sortingState, fullFilterList, setSearch } =
  usePagination({
    stateKey: 'treatments-table',
    initialSort: 'created_at,desc',
  })

const { data: treatmentsData, status } = await usePaginatedAPI<TreatmentType>(
  `${TreatmentsEndpoints.BASE}`,
  {
    key: usersKey,
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
              :endpoint="UsersEndpoints.EXPORT"
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
        :columns="usersColumns"
        :data="treatmentsData.data"
        :total-items="treatmentsData.pagination.total"
        :current-page="treatmentsData.pagination.current_page"
        :per-page="treatmentsData.pagination.per_page"
        :sorting="sortingState"
        :on-sorting-change="setSort"
        @update:page="setPage"
      />
    </div>
  </Card>
</template>
