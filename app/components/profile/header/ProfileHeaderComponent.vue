<script setup lang="ts">
import { Pencil, SquarePen, Trash2 } from 'lucide-vue-next'
import ContactDialog from '~/components/profile/dialog/ContactDialog.vue'
import type { User } from '~/types'

interface Props {
  user: User
}

const props = defineProps<Props>()

const { uploadAvatar, deleteAvatar } = useUserPictures()

const { open } = useFileSelect('image/*', (file) => uploadAvatar(props.user.uuid, file))

const isEditOpen = ref(false)
const isDeleteAvatarOpen = ref(false)

function handleAvatarAction() {
  if (props.user.avatar_path) {
    isDeleteAvatarOpen.value = true
  } else {
    open()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
    <div class="group relative -mt-12 size-24 sm:-mt-16 sm:size-32">
      <BaseUserAvatar
        :user="user"
        size="size-full border-4 border-card shadow-lg"
        class="size-full"
      />
      <button
        class="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
        @click="handleAvatarAction"
      >
        <Pencil v-if="!user.avatar_path" class="size-6 text-white" />
        <Trash2 v-else class="size-6 text-white" />
      </button>
    </div>

    <div class="flex-1 space-y-2 pb-2">
      <div class="flex items-center justify-between gap-2">
        <div>
          <h1 class="text-2xl font-bold">{{ user.first_name }} {{ user.last_name }}</h1>
          <p v-if="user.job_positions" class="text-sm font-medium text-foreground">
            {{ user.job_positions }}
          </p>
          <p v-else class="text-sm text-muted-foreground">Brak stanowiska</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          class="shrink-0 gap-1.5 text-xs"
          @click="isEditOpen = true"
        >
          <SquarePen class="size-3.5" />
          Edytuj
        </Button>
      </div>
    </div>
  </div>

  <ContactDialog v-if="isEditOpen" :user="user" @close="isEditOpen = false" />
  <BaseDeleteConfirmDialog
    v-model="isDeleteAvatarOpen"
    description="Zdjęcie profilowe zostanie trwale usunięte."
    @confirm="deleteAvatar(props.user.uuid)"
  />
</template>
