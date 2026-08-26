<script setup lang="ts">
import { XIcon, Trash2Icon, UserRoundMinusIcon } from 'lucide-vue-next'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'

const emit = defineEmits<{ close: [] }>()

const { selectedGroup, renameGroup, deleteGroup, addUserToGroup, removeUserFromGroup } =
  useMessageGroups()

const name = ref(selectedGroup.value?.name ?? '')
const addUserUuid = ref<string[]>([])
const isSaving = ref(false)
const isDeleting = ref(false)
const showDeleteConfirm = ref(false)

const existingUuids = computed(() => selectedGroup.value?.users.map((u) => u.uuid) ?? [])

async function save() {
  if (!selectedGroup.value || !name.value.trim()) return
  isSaving.value = true
  await renameGroup(selectedGroup.value.uuid, name.value.trim())
  isSaving.value = false
}

async function addUsers() {
  if (!selectedGroup.value || addUserUuid.value.length === 0) return
  for (const uuid of addUserUuid.value) {
    await addUserToGroup(selectedGroup.value.uuid, uuid)
  }
  addUserUuid.value = []
}

async function removeUser(userUuid: string) {
  if (!selectedGroup.value) return
  await removeUserFromGroup(selectedGroup.value.uuid, userUuid)
}

async function handleDelete() {
  if (!selectedGroup.value) return
  isDeleting.value = true
  await deleteGroup(selectedGroup.value.uuid)
  isDeleting.value = false
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
    <div class="bg-card border border-border rounded-lg shadow-2xl w-[400px] flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <p class="text-sm font-semibold">Ustawienia grupy</p>
        <div class="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            class="size-7 text-muted-foreground hover:text-destructive"
            :disabled="isDeleting"
            @click="showDeleteConfirm = true"
          >
            <Trash2Icon class="size-4" />
          </Button>
          <Button variant="ghost" size="icon" class="size-7" @click="emit('close')">
            <XIcon class="size-4" />
          </Button>
        </div>
      </div>

      <div class="p-4 flex flex-col gap-4">
        <div class="flex gap-2">
          <Input v-model="name" placeholder="Nazwa grupy" class="h-9 text-sm rounded-xl flex-1" />
          <Button size="sm" :disabled="!name.trim() || isSaving" @click="save"> Zapisz </Button>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Członkowie ({{ selectedGroup?.users.length }})
          </p>
          <div
            class="flex flex-col gap-1 max-h-[180px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
          >
            <div
              v-for="user in selectedGroup?.users"
              :key="user.uuid"
              class="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent"
            >
              <BaseUserAvatar :user="user" size="size-7" show-status />
              <span class="text-sm flex-1 truncate"
                >{{ user.first_name }} {{ user.last_name }}</span
              >
              <Button
                variant="ghost"
                size="icon"
                class="size-6 shrink-0 text-muted-foreground hover:text-destructive"
                :disabled="(selectedGroup?.users.length ?? 0) <= 2"
                @click="removeUser(user.uuid)"
              >
                <UserRoundMinusIcon class="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Dodaj uczestników
          </p>
          <div class="flex gap-2">
            <div class="flex-1">
              <BaseMultiselect
                v-model="addUserUuid"
                :api="UsersEndpoints.LIST_SELECT"
                :option-value="(u: User) => u.uuid"
                :option-label="(u: User) => `${u.first_name} ${u.last_name}`"
                :option-avatar="(u: User) => u.avatar_path ?? u.profile_picture"
                placeholder="Wybierz użytkowników..."
              />
            </div>
            <Button
              size="sm"
              :disabled="addUserUuid.length === 0"
              class="self-end h-9"
              @click="addUsers"
            >
              Dodaj
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <BaseDeleteConfirmDialog
    v-model="showDeleteConfirm"
    description="Wszystkie wiadomości grupy zostaną usunięte."
    @confirm="handleDelete"
  />
</template>
