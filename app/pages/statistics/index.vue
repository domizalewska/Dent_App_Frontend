<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseHeader from '~/components/base/header/BaseHeader.vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { StatisticUser } from '~/types'
import { StatisticsEndpoints, statisticsKey, statisticsUsersColumns } from '~/features/statistics'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Statystyki', link: '/statistics' }])
resetHeader()
setHeader('Statystyki')

const { globalSearch, paramsData, setPage, setSort, sortingState, setSearch } = usePagination({
  stateKey: statisticsKey,
})

const { period } = useStatisticsPeriod()

const query = computed(() => ({ ...paramsData.value, ...period.value }))

const { data: statisticsData, status } = await usePaginatedAPI<StatisticUser>(
  StatisticsEndpoints.USERS,
  { key: statisticsKey, query },
)
</script>
<template>
  <Card class="h-full">
    <div class="flex flex-col px-4">
      <BaseHeader>
        <template #left>
          <StatisticsMonthPicker />
        </template>
        <template #right>
          <BaseTableSearch :model-value="globalSearch" @search="setSearch" />
        </template>
      </BaseHeader>
    </div>

    <div class="h-full flex flex-col min-h-0 px-4">
      <DataTable
        :columns="statisticsUsersColumns"
        :data="statisticsData?.data ?? []"
        :total-items="statisticsData?.pagination.total"
        :current-page="statisticsData?.pagination.current_page"
        :per-page="statisticsData?.pagination.per_page"
        :sorting="sortingState"
        :on-sorting-change="setSort"
        @update:page="setPage"
      >
        <template #empty>Brak danych</template>
      </DataTable>
    </div>
  </Card>
</template>
