<script setup lang="ts">
import { AlertTriangle, Calendar, Clock, Plus, X } from 'lucide-vue-next'
import type { PatientType } from '~/types'
import { ref } from 'vue'
import PatientInfoFormWidget from '~/components/patients/widgets/PatientInfoFormWidget.vue'
import PatientNextAppointmentWidget from '~/components/patients/widgets/PatientNextAppointmentWidget.vue'

interface Props {
  patient: PatientType
}

defineProps<Props>()

const allergyInput = ref('')
const allergies = ref<string[]>([])

function addAllergy() {
  const trimmed = allergyInput.value.trim()
  if (trimmed && !allergies.value.includes(trimmed)) {
    allergies.value.push(trimmed)
  }
  allergyInput.value = ''
}

function removeAllergy(index: number) {
  allergies.value.splice(index, 1)
}

function onAllergyKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    addAllergy()
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-4 mt-4">
    <PatientInfoFormWidget :patient="patient" />

    <PatientNextAppointmentWidget :patient="patient" />

    <!-- Alergie -->
    <Card class="overflow-hidden rounded-lg col-span-2">
      <CardHeader class="border-b px-6 py-4">
        <div class="flex items-center gap-2">
          <AlertTriangle class="size-4 text-muted-foreground" />
          <div>
            <CardTitle class="text-sm font-medium">Alergie</CardTitle>
            <CardDescription class="text-xs">Wprowadź alergie pacjenta</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="px-6 pt-4">
        <div class="flex flex-col gap-3">
          <div class="flex gap-2">
            <Input
              v-model="allergyInput"
              placeholder="Wpisz alergię i naciśnij Enter"
              class="flex-1"
              @keydown="onAllergyKeydown"
            />
            <Button type="button" size="icon" variant="outline" @click="addAllergy">
              <Plus class="size-4" />
            </Button>
          </div>
          <div v-if="allergies.length > 0" class="flex flex-wrap gap-2">
            <Badge
              v-for="(allergy, index) in allergies"
              :key="allergy"
              variant="secondary"
              class="flex items-center gap-1 pr-1"
            >
              {{ allergy }}
              <button
                type="button"
                class="ml-1 rounded-full hover:bg-muted"
                @click="removeAllergy(index)"
              >
                <X class="size-3" />
              </button>
            </Badge>
          </div>
          <p v-else class="text-xs text-muted-foreground">Brak wpisanych alergii</p>
        </div>
      </CardContent>
    </Card>

    <!-- Ostatnia wizyta -->
    <Card class="overflow-hidden rounded-lg col-span-1">
      <CardHeader class="border-b px-6 py-4">
        <div class="flex items-center gap-2">
          <Calendar class="size-4 text-muted-foreground" />
          <div>
            <CardTitle class="text-sm font-medium">Ostatnia wizyta</CardTitle>
            <CardDescription class="text-xs">Szczegóły poprzedniej wizyty</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent class="px-6 pt-4">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-3 rounded-lg border p-3">
            <Clock class="size-4 shrink-0 text-muted-foreground" />
            <div class="flex flex-col gap-0.5">
              <span class="text-sm font-medium">Czyszczenie zębów</span>
              <span class="text-xs text-muted-foreground">3 kwietnia 2025, 09:00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
