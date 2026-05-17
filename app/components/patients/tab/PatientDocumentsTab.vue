<script setup lang="ts">
import BaseFileUpload from '~/components/base/file/BaseFileUpload.vue'
import BaseFileList from '~/components/base/file/BaseFileList.vue'
import { PatientsEndpoints } from '~/features/patients'
import type { PatientType } from '~/types'

interface Props {
  patient: PatientType
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="px-6 pt-4 pb-0">
      <CardTitle class="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        Dokumenty pacjenta
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4 flex flex-col gap-3">
      <div class="flex flex-col w-full gap-3">
        <BaseFileList
          :endpoint="PatientsEndpoints(patient.uuid).FILE_UPLOADS"
          :download-url="PatientsEndpoints(patient.uuid).FILE_DOWNLOAD"
        />
        <BaseFileUpload :endpoint="PatientsEndpoints(patient.uuid).FILE_UPLOADS" />
      </div>
    </CardContent>
  </Card>
</template>
