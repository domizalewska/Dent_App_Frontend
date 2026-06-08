<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import type { User } from '~/types'
import { useFileDialog } from '@vueuse/core'

interface Props {
  user: User
}

const props = defineProps<Props>()

const { open } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

function editBackground() {
  if (props.user.background_picture) {
    open()
  }
}
</script>
<template>
  <div
    class="group relative flex h-32 bg-muted bg-cover bg-center sm:h-40"
    style="
      background-image: url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pawel-czerwinski-O4fAgtXLRwI-unsplash.jpg');
    "
  >
    <button
      class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
      @click="editBackground"
    >
      <Pencil v-if="!user.background_picture" class="size-6 text-white" />
      <Trash2 v-else class="size-6 text-white" />
    </button>
  </div>
</template>
