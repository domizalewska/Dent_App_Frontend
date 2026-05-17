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
      <div class="flex flex-col w-full">
        <BaseFileList
          :endpoint="PatientsEndpoints(patient.uuid).FILE_UPLOADS"
          :status-config="{
            signed: { label: 'Podpisana', class: 'bg-secondary text-secondary-foreground' },
            archived: { label: 'Archiwalny', class: 'bg-secondary text-secondary-foreground' },
            issued: {
              label: 'Wystawione',
              class: 'bg-green-500/15 text-green-500 border border-green-500/30',
            },
          }"
        />
        <BaseFileUpload :endpoint="PatientsEndpoints(patient.uuid).FILE_UPLOADS" />
      </div>
    </CardContent>
  </Card>
</template>
