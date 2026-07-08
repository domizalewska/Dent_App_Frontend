<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { HoursSummary, HoursDistributionItem } from '~/types'
import { StatisticsEndpoints } from '~/features/statistics'
import { useAPI } from '~/composables/useAPI'
import { mockDistribution } from '~/mock/statistics/mockStatistics'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Statystyki', link: '/statistics' }])
resetHeader()
setHeader('Statystyki')

const { params } = useRoute()
const { id } = params as { id: string }

const { period } = useStatisticsPeriod()

const { data: summary, status: summaryStatus } = await useAPI<HoursSummary>(
  StatisticsEndpoints.USER_SUMMARY(id),
  { query: period },
)

const { data: distribution, status: distributionStatus } = await useAPI<HoursDistributionItem[]>(
  StatisticsEndpoints.USER_DISTRIBUTION(id),
  { query: period },
)
</script>
<template>
  <Card class="h-full">
    <div class="flex flex-col px-4">
      <StatisticsCard :summary="summary ?? undefined" :pending="summaryStatus === 'pending'" />
    </div>
    <div class="flex flex-col px-4">
      <StatisticsBar :distribution="distribution ?? mockDistribution" :pending="distributionStatus === 'pending'" />
    </div>
  </Card>
</template>
