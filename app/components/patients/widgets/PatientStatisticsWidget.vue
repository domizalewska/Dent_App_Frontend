<script setup lang="ts">
import type { PatientStatistics } from '~/types'
import { PatientsEndpoints } from '~/features/patients'
import { formatDateToString } from '~/utils/formatDate'

interface Props {
  patientUuid: string
}

const props = defineProps<Props>()

const { data: stats } = useAPI<PatientStatistics>(PatientsEndpoints.STATISTICS(props.patientUuid))
</script>

<template>
  <div class="grid grid-cols-4 gap-4 border-t border-b px-6 py-3">
    <div class="flex flex-col gap-0.5">
      <span class="text-xs uppercase tracking-wide text-muted-foreground">Ostatnia wizyta</span>
      <span v-if="stats?.last_visit" class="text-sm font-medium">
        {{ formatDateToString(stats.last_visit.starts_at, 'dd.MM.yyyy') }}
      </span>
      <span v-if="stats?.last_visit" class="text-xs text-muted-foreground">
        {{ stats.last_visit.doctor.first_name }} {{ stats.last_visit.doctor.last_name }}
      </span>
      <span v-if="!stats?.last_visit" class="text-sm text-muted-foreground">—</span>
    </div>

    <div class="flex flex-col gap-0.5">
      <span class="text-xs uppercase tracking-wide text-muted-foreground">Następna wizyta</span>
      <span v-if="stats?.next_visit" class="text-sm font-medium">
        {{ formatDateToString(stats.next_visit.starts_at, 'dd.MM.yyyy') }}
      </span>
      <span v-if="stats?.next_visit" class="text-xs text-muted-foreground">
        {{ stats.next_visit.doctor.first_name }} {{ stats.next_visit.doctor.last_name }}
      </span>
      <span v-if="!stats?.next_visit" class="text-sm text-muted-foreground">—</span>
    </div>

    <div class="flex flex-col gap-0.5">
      <span class="text-xs uppercase tracking-wide text-muted-foreground">Nieobecności</span>
      <span class="text-sm font-medium">
        {{ stats?.no_shows.count ?? 0 }}
        <span class="text-xs text-muted-foreground font-normal">/ {{ stats?.no_shows.total_appointments ?? 0 }} wizyt</span>
      </span>
      <span v-if="stats?.no_shows.last_at" class="text-xs text-muted-foreground">
        ostatnio {{ formatDateToString(stats.no_shows.last_at, 'dd.MM.yyyy') }}
      </span>
    </div>

    <div class="flex flex-col gap-0.5">
      <span class="text-xs uppercase tracking-wide text-muted-foreground">Prowadzący lekarz</span>
      <span v-if="stats?.lead_doctor" class="text-sm font-medium">
        {{ stats.lead_doctor.doctor.first_name }} {{ stats.lead_doctor.doctor.last_name }}
      </span>
      <span v-if="stats?.lead_doctor" class="text-xs text-muted-foreground">
        od {{ formatDateToString(stats.lead_doctor.since, 'dd.MM.yyyy') }}
      </span>
      <span v-if="!stats?.lead_doctor" class="text-sm text-muted-foreground">—</span>
    </div>
  </div>
</template>
