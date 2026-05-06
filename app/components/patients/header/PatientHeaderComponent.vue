<script setup lang="ts">
import { Calendar, Mail, Phone } from 'lucide-vue-next'
import type { PatientType } from '~/types'

interface Props {
  patient: PatientType
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
    <Avatar class="-mt-12 size-24 border-4 border-card shadow-lg sm:-mt-16 sm:size-32">
      <AvatarFallback v-if="patient.first_name && patient.last_name" class="text-2xl">
        {{ patient.first_name?.[0] }}{{ patient.last_name?.[0] }}
      </AvatarFallback>
    </Avatar>

    <div class="flex-1 space-y-2 pb-2">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">{{ patient.first_name }} {{ patient.last_name }}</h1>
        <Button
          as="a"
          :href="`tel:${patient.phone}`"
          variant="outline"
          size="sm"
          class="shrink-0 gap-1.5 text-xs"
        >
          <Phone class="mr-1 size-3" aria-hidden="true" />
          Zadzwoń
        </Button>
      </div>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span class="flex items-center gap-1.5">
          <Mail class="size-3.5" />
          {{ patient.email }}
        </span>
        <span class="flex items-center gap-1.5">
          <Phone class="size-3.5" />
          {{ patient.phone ?? 'Brak numeru' }}
        </span>
        <span class="flex items-center gap-1.5">
          <Calendar class="size-3.5" />
          Z nami od
          {{
            new Date(patient.created_at).toLocaleDateString('pl-PL', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>
