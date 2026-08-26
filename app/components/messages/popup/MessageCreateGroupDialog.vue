<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'

const emit = defineEmits<{ close: [] }>()

const { createGroup } = useMessageGroups()

const name = ref('')
const selectedUuids = ref<string[]>([])
const isLoading = ref(false)

async function submit() {
  if (!name.value.trim() || selectedUuids.value.length === 0) return
  isLoading.value = true
  await createGroup(name.value.trim(), selectedUuids.value)
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
        <Input v-model="name" placeholder="Nazwa grupy" class="h-9 text-sm rounded-xl" />

        <BaseMultiselect
          v-model="selectedUuids"
          :api="UsersEndpoints.LIST_SELECT"
          :option-value="(u: User) => u.uuid"
          :option-label="(u: User) => `${u.first_name} ${u.last_name}`"
          :option-avatar="(u: User) => u.avatar_path ?? u.profile_picture"
          placeholder="Dodaj uczestników..."
        />
      </div>

      <div class="px-4 pb-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" @click="emit('close')">Anuluj</Button>
        <Button
          size="sm"
          :disabled="!name.trim() || selectedUuids.length === 0 || isLoading"
          @click="submit"
        >
          Utwórz
        </Button>
      </div>
    </div>
  </div>
</template>
