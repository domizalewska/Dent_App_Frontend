<script setup lang="ts">
import BaseFileUpload from '~/components/base/file/BaseFileUpload.vue'
import BaseFileList from '~/components/base/file/BaseFileList.vue'
import { PatientsEndpoints, patientDetailKey } from '~/features/patients'
import type { Patient } from '~/types'
import { Plus } from 'lucide-vue-next'

interface Props {
  patient: Patient
}

defineProps<Props>()

const isOpen = ref(false)
const fileListRef = useTemplateRef('fileListRef')

function onUploadClose() {
  isOpen.value = false
  fileListRef.value?.refresh()
}
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="px-6 pt-4 pb-0 flex flex-row items-center justify-between">
      <CardTitle class="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        Dokumenty pacjenta
      </CardTitle>
      <Button variant="outline" size="sm" @click="isOpen = true">
        <Plus class="size-4" />
        Dodaj plik
      </Button>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4 flex flex-col gap-3">
      <BaseFileList
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
        <DialogTitle>Dodaj dokumenty</DialogTitle>
      </DialogHeader>
      <BaseFileUpload
        :endpoint="PatientsEndpoints.FILE_UPLOADS(patient.uuid)"
        :refresh-keys="[patientDetailKey(patient.uuid)]"
        @close="onUploadClose"
      />
    </DialogContent>
  </Dialog>
</template>
