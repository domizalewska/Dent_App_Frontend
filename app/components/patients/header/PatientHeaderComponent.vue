<script setup lang="ts">
import { Mail, Phone, SquarePen } from 'lucide-vue-next'
import type { Patient } from '~/types'

interface Props {
  patient: Patient
}

defineProps<Props>()

const isEditOpen = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
    <div class="group relative -mt-12 size-16 sm:-mt-14 sm:size-32">
      <BaseUserAvatar
        :patient="patient"
        size="size-full border-4 border-card shadow-lg"
        class="size-full"
      />
    </div>

    <div class="flex flex-col gap-1 pb-2">
      <h1 class="text-2xl font-bold">{{ patient.first_name }} {{ patient.last_name }}</h1>
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span class="flex items-center gap-1.5">
          <Mail class="size-3.5" />
          {{ patient.email }}
        </span>
      </div>
    </div>

    <div class="flex-1 space-y-2 pb-2">
      <div class="flex items-center justify-end gap-2">
        <Button
          as="a"
          :href="`tel:${patient.phone_number}`"
          variant="outline"
          size="sm"
          class="shrink-0 gap-1.5 text-xs"
        >
          <Phone class="mr-1 size-3" aria-hidden="true" />
          Zadzwoń
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="shrink-0 gap-1.5 text-xs"
          @click="isEditOpen = true"
        >
          <SquarePen class="size-3.5" />
          Edytuj
        </Button>
      </div>
    </div>

    <PatientDialog
      v-if="isEditOpen"
      :patient="patient"
      :is-edit="true"
      @close="isEditOpen = false"
    />
  </div>
</template>
