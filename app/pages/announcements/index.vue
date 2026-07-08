<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import BaseHeader from '~/components/base/header/BaseHeader.vue'
import AnnouncementCard from '~/components/announcements/card/AnnouncementCard.vue'
import DataTablePaginator from '~/components/ui/data-table/data-table-paginator.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { useDialog } from '~/composables/useDialog'
import type { Announcement } from '~/types'
import { AnnouncementsEndpoints, announcementsKey } from '~/features/announcements'
import { mockAnnouncements } from '~/mock/announcements/mockAnnouncements'
import AnnouncementsDialog from '~/components/announcements/dialog/AnnouncementsDialog.vue'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Ogłoszenia', link: '/announcements' }])
resetHeader()
setHeader('Ogłoszenia')

const { open, close, activeComponent, activeProps } = useDialog()

function addOpenDialog() {
  open(AnnouncementsDialog)
}

const { globalSearch, paramsData, setPage, setSearch } = usePagination({
  stateKey: announcementsKey,
  initialSort: 'published_at,desc',
})

const { data: announcementsData, status } = await usePaginatedAPI<Announcement>(
  AnnouncementsEndpoints.BASE,
  { key: announcementsKey, query: paramsData },
)

const displayData = computed(() =>
  status.value === 'success' ? (announcementsData.value?.data ?? []) : mockAnnouncements,
)
</script>
<template>
  <div class="h-full flex flex-col px-4">
    <BaseHeader>
      <template #right>
        <div class="flex gap-2">
          <BaseTableSearch :model-value="globalSearch" @search="setSearch" />
          <Button @click="addOpenDialog">
            <span class="font-normal">Dodaj ogłoszenie</span>
            <Icon icon="lucide:plus" />
          </Button>
        </div>
      </template>
    </BaseHeader>

    <component :is="activeComponent" v-bind="activeProps" @close="close" />

    <div class="flex flex-col gap-3">
      <AnnouncementCard
        v-for="announcement in displayData"
        :key="announcement.uuid"
        :announcement="announcement"
        :author="announcement.author"
      />
    </div>

    <div class="flex items-center justify-center py-4">
      <DataTablePaginator
        :current-page="announcementsData?.pagination.current_page ?? 1"
        :total-items="announcementsData?.pagination.total ?? 0"
        :per-page="announcementsData?.pagination.per_page ?? 15"
        @update:page="setPage"
      />
    </div>
  </div>
</template>
