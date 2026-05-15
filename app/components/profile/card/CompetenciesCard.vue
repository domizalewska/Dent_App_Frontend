<script setup lang="ts">
import { Stethoscope } from 'lucide-vue-next'
import type { User } from '~/types'

interface Props {
  user: User
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
})

const mockCompetencies = [
  'Scaling',
  'Wybielanie',
  'Ekstrakcja',
  'RTG',
  'Leczenie kanałowe',
  'Ortodoncja',
  'Profilaktyka',
  'Implantologia',
]

const competencies = computed(() =>
  props.user.competencies?.length ? props.user.competencies : mockCompetencies,
)
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
        <TagsInput :model-value="competencies" class="w-full">
          <TagsInputItem v-for="competency in competencies" :key="competency" :value="competency">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="Wprowadź zabiegi" />
        </TagsInput>
        <p class="mt-2 text-xs text-muted-foreground">Wpisz nazwę procedury i zatwierdź Enterem</p>
      </template>

      <template v-else>
        <div v-if="competencies.length" class="flex flex-wrap gap-2">
          <Badge v-for="competency in competencies" :key="competency" variant="outline">
            {{ competency }}
          </Badge>
        </div>
        <p v-else class="text-sm text-muted-foreground">Brak przypisanych kompetencji</p>
      </template>
    </CardContent>

    <div v-if="!readonly" class="flex items-center justify-end gap-3 border-t px-4 py-3">
      <Button size="sm" class="min-w-[140px] rounded-lg">Zapisz zmiany</Button>
    </div>
  </Card>
</template>
