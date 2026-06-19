<script setup lang="ts">
import { computed } from 'vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { usersColumns, UsersEndpoints } from '~/features/users'
import type { User } from '~/types'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseSwitch from '~/components/base/buttons/BaseSwitch.vue'
import BaseSkeletonHeader from '~/components/base/skeleton/header/BaseSkeletonHeader.vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import { Icon } from '@iconify/vue'
import { useDialog } from '~/composables/useDialog'
import UsersDialog from '~/components/users/dialog/UsersDialog.vue'

definePageMeta({ layout: 'dashboard' })

const isActive = ref(false)

const router = useRouter()
const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

const { open, close, activeComponent, activeProps } = useDialog()

set([{ name: 'Pracownicy', link: '/users' }])
resetHeader()
setHeader('Pracownicy')

async function addOpenDialog() {
  open(UsersDialog)
}

const { globalSearch, paramsData, setPage, setSort, sortingState, fullFilterList, setSearch } =
  usePagination({
    stateKey: 'users-table',
    initialSort: 'created_at,desc',
  })

const query = computed(() => ({
  ...paramsData.value,
  'user[is_active]': isActive.value ? undefined : true,
}))

const { data: usersData, status } = await usePaginatedAPI<User>(`${UsersEndpoints().LIST}`, {
  key: 'users',
  query,
})
</script>

<template>
  <Card class="h-full">
    <BaseSkeletonHeader v-if="status === 'pending'" />
    <BaseTableSkeleton v-if="status === 'pending'" :columns="4" />

    <ClientOnly>
      <Teleport to="#header-page-buttons">
        <BaseSwitch v-model="isActive" label="Pokaż też nieaktywnych" />
      </Teleport>
    </ClientOnly>

    <div class="flex flex-col px-4">
      <BaseHeader v-if="usersData?.data">
        <template #right>
          <div class="flex gap-2">
            <BaseTableSearch :model-value="globalSearch" @search="setSearch" />
            <BaseExportFile
              :params="fullFilterList"
              :extensions="['xlsx', 'csv', 'pdf']"
              :endpoint="`${UsersEndpoints().EXPORT}`"
              file-name="Tabela użytkowników"
            />
            <Button @click="addOpenDialog()">
              <template #default>
                <span class="text-color font-normal">
                  {{ 'Dodaj pracownika' }}
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
        v-if="usersData"
        :columns="usersColumns"
        :data="usersData.data"
        :total-items="usersData.pagination.total"
        :current-page="usersData.pagination.current_page"
        :per-page="usersData.pagination.per_page"
        :sorting="sortingState"
        :on-sorting-change="setSort"
        :on-row-click="(row) => router.push(`/users/${row.uuid}`)"
        @update:page="setPage"
      />
    </div>
  </Card>
</template>
