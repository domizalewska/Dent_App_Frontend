<script setup lang="ts">
import type { PermissionGroupType, PermissionType } from '~/types'
import { PermissionGroupsEndpoints } from '~/features/permission-groups'
import { permissionsKey } from '~/features/permission-groups'
import { mockPermissions } from '~/mock/permission-groups/mockPermissionGroups'

interface Props {
  group: PermissionGroupType
}
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { assignPermissions } = usePermissionGroups()

const { data: allPermissions } = useAPI<PermissionType[]>(PermissionGroupsEndpoints.PERMISSIONS, {
  key: permissionsKey,
  default: (): PermissionType[] => mockPermissions,
})

const selected = ref<Set<string>>(new Set(props.group.permissions.map((p) => p.uuid)))

const grouped = computed(() => {
  const map: Record<string, PermissionType[]> = {}
  for (const p of allPermissions.value ?? []) {
    const module = p.name.split('.')[0] ?? 'other'
    if (!map[module]) map[module] = []
    map[module]!.push(p)
  }
  return map
})

const moduleLabels: Record<string, string> = {
  patients: 'Pacjenci',
  users: 'Pracownicy',
  calendar: 'Kalendarz',
  treatments: 'Usługi',
  statistics: 'Statystyki',
  announcements: 'Ogłoszenia',
  schedule: 'Grafik pracowników',
  job_positions: 'Stanowiska',
  permission_group: 'Grupy uprawnień',
}

const actionLabels: Record<string, string> = {
  index: 'Przeglądanie listy',
  show: 'Przeglądanie szczegółów',
  store: 'Dodawanie',
  update: 'Edycja',
  destroy: 'Usuwanie',
  today: 'Dzisiaj',
  assign_permissions: 'Przypisywanie uprawnień',
}

function permissionLabel(name: string) {
  const action = name.split('.')[1] ?? ''
  return actionLabels[action] ?? action
}

function togglePermission(uuid: string) {
  const next = new Set(selected.value)
  if (next.has(uuid)) {
    next.delete(uuid)
  } else {
    next.add(uuid)
  }
  selected.value = next
}

function isModuleChecked(module: string) {
  return grouped.value[module]?.every((p) => selected.value.has(p.uuid)) ?? false
}

function isModuleIndeterminate(module: string) {
  const perms = grouped.value[module] ?? []
  const checkedCount = perms.filter((p) => selected.value.has(p.uuid)).length
  return checkedCount > 0 && checkedCount < perms.length
}

function toggleModule(module: string) {
  const perms = grouped.value[module] ?? []
  const next = new Set(selected.value)
  if (isModuleChecked(module)) {
    perms.forEach((p) => next.delete(p.uuid))
  } else {
    perms.forEach((p) => next.add(p.uuid))
  }
  selected.value = next
}

async function onSave() {
  await assignPermissions(props.group.uuid, Array.from(selected.value))
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-w-2xl max-h-[85vh] flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle>Uprawnienia: {{ group.name }}</DialogTitle>
      </DialogHeader>

      <div class="flex-1 overflow-y-auto min-h-0 px-4 py-4 flex flex-col gap-4">
        <div
          v-for="(perms, module) in grouped"
          :key="module"
          class="border border-border rounded-lg overflow-hidden"
        >
          <div
            class="flex items-center gap-3 px-3 py-2 bg-muted/40 border-b border-border cursor-pointer"
            @click="toggleModule(module)"
          >
            <Checkbox
              :checked="isModuleChecked(module)"
              :indeterminate="isModuleIndeterminate(module)"
              @click.stop="toggleModule(module)"
            />
            <span class="text-sm font-medium">{{ moduleLabels[module] ?? module }}</span>
          </div>
          <div class="divide-y divide-border">
            <div
              v-for="perm in perms"
              :key="perm.uuid"
              class="flex items-center gap-3 px-3 py-2 hover:bg-muted/20 cursor-pointer"
              @click="togglePermission(perm.uuid)"
            >
              <Checkbox
                :checked="selected.has(perm.uuid)"
                @click.stop="togglePermission(perm.uuid)"
              />
              <div class="flex flex-col min-w-0">
                <span class="text-sm">{{ permissionLabel(perm.name) }}</span>
                <span v-if="perm.description" class="text-xs text-muted-foreground">{{
                  perm.description
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t px-4 py-3">
        <BaseAcceptDeclineButtons
          confirm-title="Zapisz"
          cancel-title="Anuluj"
          @accept="onSave"
          @cancel="emit('close')"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>
