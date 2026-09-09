<script setup lang="ts">
import { FilePlus } from 'lucide-vue-next'
import PatientReceiptTable from '~/components/patients/table/PatientReceiptTable.vue'

interface Props {
  patientUuid: string
}

defineProps<Props>()
</script>
<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="flex flex-row items-center justify-between px-6 pb-0 pt-4">
      <CardTitle class="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Recepty
      </CardTitle>
      <Button variant="outline" size="sm">
        <FilePlus class="size-4" />
        Dodaj receptę
      </Button>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4 overflow-x-auto">
      <PatientReceiptTable :patient-uuid="patientUuid" />
    </CardContent>
  </Card>
</template>
