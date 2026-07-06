<script setup lang="ts">
import { Stethoscope, X as XIcon } from 'lucide-vue-next'
import type { User } from '~/types'
import type { TreatmentType } from '~/types/treatments/treatments.type'
import { TreatmentsEndpoints, treatmentsSelectKey } from '~/features/treatments'
import { useProfile } from '~/composables/profile/useProfile'

interface Props {
  user: User
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
})

const { data: availableTreatments, status: treatmentsStatus } = usePaginatedAPI<TreatmentType>(
  TreatmentsEndpoints.LIST_SELECT,
  {
    key: treatmentsSelectKey,
  },
)
const isTreatmentsLoading = computed(() => treatmentsStatus.value === 'pending')

const selectedCompetencies = ref<TreatmentType[]>(props.user.competencies ?? [])

const search = ref('')

const filteredAvailableTreatments = computed(() => {
  const treatments = availableTreatments.value?.data ?? []
  const selectedUuids = new Set(selectedCompetencies.value.map((s) => s.uuid))
  return treatments
    .filter((s) => !selectedUuids.has(s.uuid))
    .filter((s) => s.name.toLowerCase().includes(search.value.toLowerCase()))
})

function selectTreatment(treatment: TreatmentType) {
  selectedCompetencies.value = [...selectedCompetencies.value, treatment]
}

function removeTreatment(uuid: string) {
  selectedCompetencies.value = selectedCompetencies.value.filter((s) => s.uuid !== uuid)
}

const { editCompetencies } = useProfile(props.user.uuid)

async function saveChanges() {
  await editCompetencies(selectedCompetencies.value.map((s) => s.uuid))
}
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center gap-2">
        <Stethoscope class="size-4 text-muted-foreground" />
        <div>
          <CardTitle class="text-sm font-medium">Kompetencje</CardTitle>
          <CardDescription class="text-xs">
            Procedury i zabiegi które pracownik może wykonywać
          </CardDescription>
        </div>
      </div>
    </CardHeader>

    <CardContent class="px-4 py-4">
      <template v-if="!readonly">
        <div
          class="flex max-h-32 flex-wrap gap-2 overflow-y-auto rounded-lg border border-input bg-transparent p-2"
        >
          <Badge
            v-for="competency in selectedCompetencies"
            :key="competency.uuid"
            variant="secondary"
            class="gap-1 pr-1.5"
          >
            {{ competency.name }}
            <button type="button" @click="removeTreatment(competency.uuid)">
              <XIcon class="size-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>

          <span v-if="selectedCompetencies.length === 0" class="text-xs text-muted-foreground">
            Brak wybranych zabiegów
          </span>
        </div>

        <Input v-model="search" placeholder="Szukaj zabiegu, aby dodać..." class="mt-3" />

        <div class="mt-2 max-h-40 overflow-y-auto rounded-lg border border-input">
          <div v-if="isTreatmentsLoading" class="space-y-2 p-2">
            <Skeleton v-for="i in 3" :key="i" class="h-9 w-full rounded-md" />
          </div>

          <p
            v-else-if="filteredAvailableTreatments.length === 0"
            class="p-3 text-center text-sm text-muted-foreground"
          >
            Brak wyników.
          </p>

          <button
            v-for="treatment in filteredAvailableTreatments"
            v-else
            :key="treatment.uuid"
            type="button"
            class="w-full border-b border-border px-3 py-2 text-left text-sm last:border-b-0 hover:bg-secondary/60"
            @click="selectTreatment(treatment)"
          >
            <p class="text-foreground">{{ treatment.name }}</p>
            <p v-if="treatment.short_description" class="text-xs text-muted-foreground">
              {{ treatment.short_description }}
            </p>
          </button>
        </div>

        <p class="mt-2 text-xs text-muted-foreground">
          Wybierz zabieg z listy dostępnych procedur.
        </p>
      </template>

      <template v-else>
        <div v-if="selectedCompetencies.length" class="flex flex-wrap gap-2">
          <Badge
            v-for="competency in selectedCompetencies"
            :key="competency.uuid"
            variant="outline"
          >
            {{ competency.name }}
          </Badge>
        </div>
        <p v-else class="text-sm text-muted-foreground">Brak przypisanych kompetencji</p>
      </template>
    </CardContent>

    <div v-if="!readonly" class="flex items-center justify-end gap-3 border-t px-4 py-3">
      <Button size="sm" class="min-w-[140px] rounded-lg" @click="saveChanges">
        Zapisz zmiany
      </Button>
    </div>
  </Card>
</template>
