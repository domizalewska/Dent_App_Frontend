<script setup lang="ts">
import { Icon } from '@iconify/vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { PermissionGroupType } from '~/types'
import {
  getPermissionGroupColumns,
  PermissionGroupsEndpoints,
  permissionGroupsKey,
} from '~/features/permission-groups'
import PermissionGroupDialog from '~/components/permission-groups/dialog/PermissionGroupDialog.vue'

definePageMeta({
  layout: 'dashboard',
  somePermissions: ['permission_group.index'],
})

const { set } = useBreadcrumbs()
set([{ name: 'Grupy uprawnień', link: '/permission-groups' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Grupy uprawnień')

const { open, close, activeComponent, activeProps } = useDialog()

const deleteDialogOpen = ref(false)
const pendingDeleteUuid = ref<string | null>(null)
const { deleteGroup } = usePermissionGroups()

function openAddDialog() {
  open(PermissionGroupDialog)
}

function openEditDialog(group: PermissionGroupType) {
  open(PermissionGroupDialog, { group, isEdit: true })
}

function requestDelete(uuid: string) {
  pendingDeleteUuid.value = uuid
  deleteDialogOpen.value = true
}

async function confirmDelete() {
  if (pendingDeleteUuid.value) {
    await deleteGroup(pendingDeleteUuid.value)
    pendingDeleteUuid.value = null
  }
}

const columns = getPermissionGroupColumns(openEditDialog, requestDelete)

const { paramsData, setPage } = usePagination({ stateKey: 'permission-groups-table' })

const { data: groupsData, status } = usePaginatedAPI<PermissionGroupType>(
  PermissionGroupsEndpoints.BASE,
  { key: permissionGroupsKey, query: paramsData },
)
</script>

<template>
  <Card class="h-full">
    <BaseSkeletonHeader v-if="status === 'pending'" />
    <BaseTableSkeleton v-if="status === 'pending'" :columns="4" />

    <template v-if="status !== 'pending'">
      <div class="flex flex-col px-4">
        <BaseHeader>
          <template #right>
            <Button @click="openAddDialog">
              <Icon icon="lucide:plus" class="size-4" />
              Dodaj grupę
            </Button>
          </template>
        </BaseHeader>

        <component :is="activeComponent" v-bind="activeProps" @close="close" />
      </div>

      <div class="px-4">
        <DataTable
          v-if="groupsData"
          :columns="columns"
          :data="groupsData.data"
          :total-items="groupsData.pagination.total"
          :current-page="groupsData.pagination.current_page"
          :per-page="groupsData.pagination.per_page"
          @update:page="setPage"
        />
      </div>
    </template>

    <BaseDeleteConfirmDialog
      v-model="deleteDialogOpen"
      description="Grupa uprawnień zostanie trwale usunięta."
      @confirm="confirmDelete"
    />
  </Card>
</template>
