<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'

const emit = defineEmits<{ close: [] }>()

const { createGroup } = useMessages()
const { data } = useAPI<{ data: User[] }>(UsersEndpoints.LIST_SELECT)

const name = ref('')
const search = ref('')
const selectedUsers = ref<User[]>([])
const isLoading = ref(false)

const filteredUsers = computed(() => {
  const s = search.value.toLowerCase()
  return (data.value?.data ?? []).filter(
    (u) =>
      `${u.first_name} ${u.last_name}`.toLowerCase().includes(s) &&
      !selectedUsers.value.some((su) => su.uuid === u.uuid),
  )
})

function toggleUser(user: User) {
  selectedUsers.value.push(user)
  search.value = ''
}

function removeUser(uuid: string) {
  selectedUsers.value = selectedUsers.value.filter((u) => u.uuid !== uuid)
}

async function submit() {
  if (!name.value.trim() || selectedUsers.value.length === 0) return
  isLoading.value = true
  await createGroup(
    name.value.trim(),
    selectedUsers.value.map((u) => u.uuid),
  )
  isLoading.value = false
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
    <div class="bg-card border border-border rounded-lg shadow-2xl w-[380px] flex flex-col">
      <div class="flex items-center justify-between px-4 py-3 border-b border-border">
        <p class="text-sm font-semibold">Nowa grupa</p>
        <Button variant="ghost" size="icon" class="size-7" @click="emit('close')">
          <XIcon class="size-4" />
        </Button>
      </div>

      <div class="p-4 flex flex-col gap-3">
        <Input v-model="name" placeholder="Nazwa grupy" class="h-8 text-sm" />

        <div class="flex flex-col gap-1.5">
          <Input v-model="search" placeholder="Szukaj uczestników..." class="h-8 text-sm" />

          <div v-if="selectedUsers.length" class="flex flex-wrap gap-1.5 pt-1">
            <span
              v-for="user in selectedUsers"
              :key="user.uuid"
              class="flex items-center gap-1 bg-accent text-xs px-2 py-0.5 rounded-full"
            >
              {{ user.first_name }} {{ user.last_name }}
              <button type="button" class="text-muted-foreground hover:text-foreground" @click="removeUser(user.uuid)">
                <XIcon class="size-3" />
              </button>
            </span>
          </div>

          <div v-if="search" class="border border-border rounded-md overflow-hidden max-h-[180px] overflow-y-auto">
            <button
              v-for="user in filteredUsers"
              :key="user.uuid"
              type="button"
              class="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent text-left transition-colors"
              @click="toggleUser(user)"
            >
              <BaseUserAvatar :user="user" size="size-6" />
              <span class="text-sm">{{ user.first_name }} {{ user.last_name }}</span>
            </button>
            <p v-if="filteredUsers.length === 0" class="px-3 py-2 text-xs text-muted-foreground">
              Brak wyników
            </p>
          </div>
        </div>
      </div>

      <div class="px-4 pb-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" @click="emit('close')">Anuluj</Button>
        <Button
          size="sm"
          :disabled="!name.trim() || selectedUsers.length === 0 || isLoading"
          @click="submit"
        >
          Utwórz
        </Button>
      </div>
    </div>
  </div>
</template>
