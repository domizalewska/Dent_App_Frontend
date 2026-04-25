<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { usersColumns, UsersEndpoints } from '~/features/users'
import type { User } from '~/types'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseSwitch from '~/components/base/buttons/BaseSwitch.vue'
import { computed, ref } from 'vue'
import BaseSkeletonHeader from '~/components/base/skeleton/header/BaseSkeletonHeader.vue'
import { ProfileRoutes } from '~/types/routes'

definePageMeta({
  layout: 'dashboard',
})

const isActive = ref<boolean>(false)

const router = useRouter()
const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Użytkownicy', link: '/users' }])

resetHeader()
setHeader('Użytkownicy')

const usersActive = computed(() => {})

const { data: usersData, pending, error } = await usePaginatedAPI<User>(UsersEndpoints().LIST)
</script>

<template>
  <div class="h-full">
    <BaseSkeletonHeader v-if="pending" />
    <BaseTableSkeleton v-if="pending" :columns="4" />
    <ClientOnly>
      <Teleport to="#header-page-buttons">
        <BaseSwitch :value="isActive" label="Pokaż też nieaktywnych" />
      </Teleport>
    </ClientOnly>
    <div class="flex flex-col">
      <BaseHeader v-if="usersData?.data">
        <template #right>
          <div class="flex gap-2">
            <BaseTableSearch />
            <BaseExportFile
              :extensions="['xlsx', 'csv', 'pdf']"
              :endpoint="`${UsersEndpoints().EXPORT}`"
              file-name="Tabela użytkowników"
            />
          </div>
        </template>
      </BaseHeader>
    </div>

    <div class="h-full flex flex-col min-h-0">
      <DataTable
        v-if="usersData?.data"
        :columns="usersColumns"
        :data="usersData.data"
        :on-row-click="(row) => router.push(`${ProfileRoutes.PROFILE(row.uuid)}`)"
      />
    </div>
  </div>
</template>
