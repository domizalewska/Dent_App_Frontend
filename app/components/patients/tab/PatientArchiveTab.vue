<script setup lang="ts">
import DataTable from '~/components/ui/data-table/data-table.vue'
import BaseTableSkeleton from '~/components/base/skeleton/table/BaseTableSkeleton.vue'
import type { VisitType } from '~/types'
import { patientAppointmentsColumns, PatientsEndpoints } from '~/features/patients'

interface Props {
  patientUuid: string
}

const props = defineProps<Props>()

const { data, pending, error } = usePaginatedAPI<VisitType>(() =>
  PatientsEndpoints.VISITS(props.patientUuid),
)
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
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
