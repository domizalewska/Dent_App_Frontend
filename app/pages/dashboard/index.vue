<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { ActivityIcon, CalendarIcon, StethoscopeIcon } from 'lucide-vue-next'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Pulpit', link: '/dashboard' }])
resetHeader()
setHeader('Pulpit')
</script>

<template>
  <div class="flex h-screen">
    <div class="flex flex-col gap-6 w-full">
      <div class="grid grid-cols-3 gap-4 w-full">
        <StatisticWidgets
          label="Wizyty dzisiaj"
          :value="38"
          :icon="CalendarIcon"
          hint="8 oczekujących"
        />
        <StatisticWidgets
          label="Aktywni lekarze"
          :value="9"
          :icon="StethoscopeIcon"
          hint="2 na urlopie"
        />
        <StatisticWidgets
          label="Obłożenie gabinetów"
          value="82%"
          :icon="ActivityIcon"
          :trend="{ value: '+5% wzg. tygodnia', direction: 'up' }"
        />
      </div>
      <div class="flex items-center justify-center gap-2 text-sm">eferferefrrf</div>
    </div>
  </div>
</template>
