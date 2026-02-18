<script setup lang="ts">
import type { User } from '~/types/users/typesUsers'
import { columns } from '~/components/ui/data-table/columns'
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { generateMockUsers } from '~/mock/users/mockUsers'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()

set([{ name: 'Użytkownicy', link: '/users' }])

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Użytkownicy')
const data = ref<User[]>([])

async function getData(): Promise<User[]> {
  return generateMockUsers(70)
}

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="flex w-full">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
