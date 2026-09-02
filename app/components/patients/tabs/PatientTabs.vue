<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Patient } from '~/types'
import PatientHeaderComponent from '~/components/patients/header/PatientHeaderComponent.vue'
import PatientDocumentsTab from '~/components/patients/tab/PatientDocumentsTab.vue'
import PatientPictureTab from '~/components/patients/tab/PatientPictureTab.vue'
import PatientArchiveTab from '~/components/patients/tab/PatientArchiveTab.vue'

interface Props {
  patient: Patient
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
    name: 'Recepty',
    value: 'receipts',
    icon: 'material-symbols:shield-outline',
  },
  {
    name: 'Zdjęcia',
    value: 'pictures',
    icon: 'solar:user-id-line-duotone',
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
      <div class="h-32 bg-muted sm:h-40" />
      <CardContent class="relative px-6 pb-0">
        <PatientHeaderComponent :patient="patient" />
      </CardContent>
      <div class="px-6">
        <TabsList variant="line" class="w-full">
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
    <TabsContent value="receipts">
      <PatientReceiptTab :patient="patient" />
    </TabsContent>
    <TabsContent value="pictures">
      <PatientPictureTab />
    </TabsContent>
    <TabsContent value="archive">
      <PatientArchiveTab :patient-uuid="patient.uuid" />
    </TabsContent>
  </Tabs>
</template>
