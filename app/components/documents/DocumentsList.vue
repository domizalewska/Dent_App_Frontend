<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import type { User } from '~/types'
import BaseFileList from '~/components/base/file/BaseFileList.vue'
import BaseFileUpload from '~/components/base/file/BaseFileUpload.vue'
import { UsersEndpoints } from '~/features/users'

interface Props {
  user: User
}

defineProps<Props>()

const isOpen = ref(false)
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="px-6 pt-4 pb-0 flex flex-row items-center justify-between">
      <Button class="ml-auto flex items-center" variant="outline" size="sm" @click="isOpen = true">
        <Plus class="size-4" />
        Dodaj plik
      </Button>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4 flex flex-col gap-3">
      <BaseFileList
        :endpoint="UsersEndpoints.FILE_UPLOAD(user.uuid)"
        :download-url="(fileUuid) => UsersEndpoints.FILE_DOWNLOAD(user.uuid, fileUuid)"
      />
    </CardContent>
  </Card>

  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj dokumenty</DialogTitle>
      </DialogHeader>
      <BaseFileUpload
        :endpoint="UsersEndpoints.FILE_UPLOAD(user.uuid)"
        :on-success="() => (isOpen = false)"
      />
    </DialogContent>
  </Dialog>
</template>
