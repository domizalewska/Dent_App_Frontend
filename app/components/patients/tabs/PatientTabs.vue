<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { PatientType } from '~/types'
import PatientHeaderComponent from '~/components/patients/header/PatientHeaderComponent.vue'
import PatientDocumentsTab from '~/components/patients/tab/PatientDocumentsTab.vue'
import PatientArchiveTab from '~/components/patients/tab/PatientArchiveTab.vue'

interface Props {
  patient: PatientType
}

defineProps<Props>()

const tabs = [
  {
    name: 'Informacje',
    value: 'info',
    icon: 'solar:user-id-line-duotone',
  },
  {
    name: 'Dokumenty',
    value: 'documents',
    icon: 'material-symbols:shield-outline',
  },
  {
    name: 'Archiwum',
    value: 'archive',
    icon: 'solar:user-id-line-duotone',
  },
]
</script>

<template>
  <Tabs default-value="info" class="w-full gap-0">
    <Card class="overflow-hidden pt-0 rounded-b-none border-b-0">
      <CardContent class="flex px-6 pb-0 justify-center">
        <PatientHeaderComponent :patient="patient" />
      </CardContent>
      <div class="px-6">
        <TabsList class="w-full">
          <TabsTrigger
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.value"
            class="flex items-center gap-1 px-2.5 sm:px-3"
          >
            <Icon :icon="tab.icon" />
            {{ tab.name }}
          </TabsTrigger>
        </TabsList>
      </div>
    </Card>

    <TabsContent value="info">
      <PatientInfoCard :patient="patient" />
    </TabsContent>
    <TabsContent value="documents">
      <PatientDocumentsTab :patient="patient" />
    </TabsContent>
    <TabsContent value="archive">
      <PatientArchiveTab :patient-uuid="patient.uuid" />
    </TabsContent>
  </Tabs>
</template>
