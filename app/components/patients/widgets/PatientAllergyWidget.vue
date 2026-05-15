<script setup lang="ts">
import { Plus, X } from 'lucide-vue-next'
import { ref } from 'vue'

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
  <Card class="overflow-hidden rounded-lg">
    <CardHeader class="px-6 pb-2 pt-4">
      <CardTitle class="text-xs font-medium text-muted-foreground tracking-wide uppercase">
        Alergie
      </CardTitle>
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
</template>
