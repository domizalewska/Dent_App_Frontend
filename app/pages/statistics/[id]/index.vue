<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { DailyDetailEntry, HoursDistributionItem, HoursSummary, User } from '~/types'
import { statisticsDetailKey, StatisticsEndpoints } from '~/features/statistics'
import { profileKey, UsersEndpoints } from '~/features/users'
import { statisticsDailyColumns } from '~/features/statistics/[id]'
import { useAPI, usePaginatedAPI } from '~/composables/useAPI'
import DataTable from '~/components/ui/data-table/data-table.vue'
import {
  mockDailyDetails,
  mockDistribution,
  mockStatisticUser,
} from '~/mock/statistics/mockStatistics'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

const { params } = useRoute()
const { id } = params as { id: string }

const { data: userData } = await useAPI<User>(UsersEndpoints.DETAILS(id), { key: profileKey(id) })

const user = userData.value ?? mockStatisticUser.user
const fullName = `${user.first_name} ${user.last_name}`
resetHeader()
setHeader(fullName)
set([{ name: 'Statystyki', link: '/statistics' }, { name: fullName }])

const { period } = useStatisticsPeriod()

const { data: summary, status: summaryStatus } = await useAPI<HoursSummary>(
  StatisticsEndpoints.USER_SUMMARY(id),
  { query: period },
)

const { data: distribution, status: distributionStatus } = await useAPI<HoursDistributionItem[]>(
  StatisticsEndpoints.USER_DISTRIBUTION(id),
  { query: period },
)

const { paramsData, setPage, setSort, sortingState } = usePagination({
  stateKey: statisticsDetailKey,
})

const dailyQuery = computed(() => ({ ...paramsData.value, ...period.value }))

const { data: daily, status: dailyStatus } = await usePaginatedAPI<DailyDetailEntry>(
  StatisticsEndpoints.USER_DAILY(id),
  { key: statisticsDetailKey, query: dailyQuery },
)
</script>
<template>
  <Card class="h-full">
    <div class="flex flex-col px-4">
      <StatisticsCard :summary="summary ?? undefined" :pending="summaryStatus === 'pending'" />
    </div>
    <div class="flex flex-col px-4">
      <StatisticsBar
        :distribution="distribution ?? mockDistribution"
        :pending="distributionStatus === 'pending'"
      />
    </div>
    <div class="h-full flex flex-col min-h-0 px-4">
      <DataTable
        :columns="statisticsDailyColumns"
        :data="daily?.data ?? mockDailyDetails"
        :total-items="daily?.pagination.total"
        :current-page="daily?.pagination.current_page"
        :per-page="daily?.pagination.per_page"
        :sorting="sortingState"
        :on-sorting-change="setSort"
        @update:page="setPage"
      >
        <template #empty>Brak danych</template>
      </DataTable>
    </div>
  </Card>
</template>
