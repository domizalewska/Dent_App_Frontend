<script setup lang="ts">
import { ImagePlus } from 'lucide-vue-next'
import { PatientsEndpoints, patientDetailKey } from '~/features/patients'
import type { Patient } from '~/types'
import BaseFileUpload from '~/components/base/file/BaseFileUpload.vue'
import BaseImageList from '~/components/base/file/BaseImageList.vue'

interface Props {
  patient: Patient
}

defineProps<Props>()

const isOpen = ref(false)
const fileListRef = useTemplateRef<InstanceType<typeof BaseImageList>>('fileListRef')

function onUploadClose() {
  isOpen.value = false
  fileListRef.value?.refresh()
}
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="flex flex-row items-center justify-between px-6 pb-0 pt-4">
      <CardTitle class="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Zdjęcia pacjenta
      </CardTitle>
      <Button variant="outline" size="sm" @click="isOpen = true">
        <ImagePlus class="size-4" />
        Dodaj zdjęcia
      </Button>
    </CardHeader>
    <CardContent class="px-6 pb-4 pt-3 flex flex-col gap-3">
      <BaseImageList
        ref="fileListRef"
        :endpoint="PatientsEndpoints.FILE_UPLOADS(patient.uuid)"
        :download-url="(fileUuid) => PatientsEndpoints.FILE_DOWNLOAD(patient.uuid, fileUuid)"
        :delete-url="(fileUuid) => PatientsEndpoints.FILE_DELETE(patient.uuid, fileUuid)"
      />
    </CardContent>
  </Card>

  <Dialog :open="isOpen" @update:open="isOpen = $event">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj zdjęcia</DialogTitle>
      </DialogHeader>
      <BaseFileUpload
        :endpoint="PatientsEndpoints.FILE_UPLOADS(patient.uuid)"
        :refresh-keys="[patientDetailKey(patient.uuid)]"
        accept="image/*"
        :drop-data-types="['image/jpeg', 'image/png', 'image/webp', 'image/gif']"
        @close="onUploadClose"
      />
    </DialogContent>
  </Dialog>
</template>
