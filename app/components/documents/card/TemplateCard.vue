<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { DocumentTemplate } from '~/types'

interface Props {
  template: DocumentTemplate
}

defineProps<Props>()
const emit = defineEmits<{ use: [uuid: string] }>()
</script>

<template>
  <Card class="flex flex-col gap-3 p-4 hover:bg-secondary/50 transition-colors cursor-pointer" @click="emit('use', template.uuid)">
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <div class="flex size-8 items-center justify-center rounded-md bg-primary/10">
          <Icon icon="lucide:file-text" class="size-4 text-primary" />
        </div>
        <span class="text-sm font-medium">{{ template.title }}</span>
      </div>
      <Badge variant="secondary" class="shrink-0 text-xs">{{ template.category }}</Badge>
    </div>
    <p v-if="template.description" class="text-xs text-muted-foreground line-clamp-2">
      {{ template.description }}
    </p>
    <Button variant="outline" size="sm" class="mt-auto w-full" @click.stop="emit('use', template.uuid)">
      <Icon icon="lucide:plus" class="size-3.5" />
      Użyj szablonu
    </Button>
  </Card>
</template>
