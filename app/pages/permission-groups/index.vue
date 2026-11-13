<script setup lang="ts">
import { Icon } from '@iconify/vue'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { PermissionGroupType } from '~/types'
import {
  PermissionGroupsEndpoints,
  permissionGroupsKey,
  getPermissionGroupColumns,
} from '~/features/permission-groups'
import { mockPermissionGroups } from '~/mock/permission-groups/mockPermissionGroups'
import PermissionGroupDialog from '~/components/permission-groups/dialog/PermissionGroupDialog.vue'
import AssignPermissionsDialog from '~/components/permission-groups/dialog/AssignPermissionsDialog.vue'

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

function openAssignDialog(group: PermissionGroupType) {
  open(AssignPermissionsDialog, { group })
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

const columns = getPermissionGroupColumns(openEditDialog, openAssignDialog, requestDelete)

const { data: groups, pending } = useAPI<PermissionGroupType[]>(PermissionGroupsEndpoints.BASE, {
  key: permissionGroupsKey,
  default: (): PermissionGroupType[] => mockPermissionGroups,
})
</script>

<template>
  <Card class="h-full">
    <div v-if="pending">
      <BaseSkeletonHeader />
      <BaseTableSkeleton :columns="4" />
    </div>

    <template v-else>
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
        <DataTable :columns="columns" :data="groups ?? []" />
      </div>
    </template>

    <BaseDeleteConfirmDialog
      v-model="deleteDialogOpen"
      description="Grupa uprawnień zostanie trwale usunięta."
      @confirm="confirmDelete"
    />
  </Card>
</template>
