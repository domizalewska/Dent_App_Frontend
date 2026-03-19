<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { usersColumns, UsersEndpoints } from '~/features/users'
import type { User } from '~/types'

definePageMeta({
  layout: 'dashboard',
})

const { set } = useBreadcrumbs()

set([{ name: 'Użytkownicy', link: '/users' }])

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Użytkownicy')

const { data: usersData, pending, error } = usePaginatedAPI<User>(`${UsersEndpoints.LIST}`)
</script>

<template>
  <div class="flex w-full">
    <DataTable v-if="usersData?.data" :columns="usersColumns" :data="usersData.data" />
  </div>
</template>
