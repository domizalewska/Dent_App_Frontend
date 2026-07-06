<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import BaseTableSkeleton from '~/components/base/skeleton/table/BaseTableSkeleton.vue'
import type { AppointmentType } from '~/types'
import { patientAppointmentsColumns } from '~/features/patients/patients.appointments.columns'
import { PatientsEndpoints } from '~/features/patients'

interface Props {
  patientUuid: string
}

const props = defineProps<Props>()

const { data, pending, error } = usePaginatedAPI<AppointmentType>(() =>
  PatientsEndpoints.APPOINTMENTS(props.patientUuid),
)
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center justify-between">
        <CardTitle class="text-sm font-medium">Archiwum wizyt</CardTitle>
        <span v-if="data?.total" class="text-xs text-muted-foreground">
          {{ data.total }} {{ data.total === 1 ? 'wizyta' : 'wizyt' }}
        </span>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <BaseTableSkeleton v-if="pending" :columns="5" />

      <p v-else-if="error" class="py-8 text-center text-sm text-destructive">
        Nie udało się załadować historii wizyt
      </p>

      <template v-else>
        <DataTable
          v-if="data?.data?.length"
          :columns="patientAppointmentsColumns"
          :data="data.data"
        />
        <p v-else class="py-8 text-center text-sm text-muted-foreground">Brak wizyt w archiwum</p>
      </template>
    </CardContent>
  </Card>
</template>
