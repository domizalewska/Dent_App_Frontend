<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import type { User } from '~/types'
import BaseDeleteConfirmDialog from '~/components/base/dialog/BaseDeleteConfirmDialog.vue'

interface Props {
  user: User
}

const props = defineProps<Props>()

const isDeleteBackgroundOpen = ref(false)

const { uploadBackground, deleteBackground } = useUserPictures()

const { open } = useFileSelect('image/*', (file) => uploadBackground(props.user.uuid, file))

function handleBackgroundAction() {
  if (props.user.background_path) {
    isDeleteBackgroundOpen.value = true
  } else {
    open()
  }
}
</script>

<template>
  <div
    class="group relative flex h-32 bg-muted bg-cover bg-center sm:h-40"
    :style="{
      backgroundImage: `url('${user.background_path ?? 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg'}')`,
    }"
  >
    <button
      class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
      @click="handleBackgroundAction"
    >
      <Pencil v-if="!user.background_path" class="size-6 text-white" />
      <Trash2 v-else class="size-6 text-white" />
    </button>
  </div>
  <BaseDeleteConfirmDialog
    v-model="isDeleteBackgroundOpen"
    description="Zdjęcie w tle zostanie trwale usunięte."
    @confirm="deleteBackground(props.user.uuid)"
  />
</template>
