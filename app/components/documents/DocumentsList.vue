<script setup lang="ts">
import { FileTextIcon } from 'lucide-vue-next'
import { generateMockDocuments } from '~/mock/documents/mockDocuments'
import type { Document, DocumentStatus } from '~/types'

const documents = ref<Document[]>([])

onMounted(() => {
  documents.value = generateMockDocuments()
})

const statusColor: Record<DocumentStatus, string> = {
  active: 'bg-emerald-500',
  pending: 'bg-amber-500',
  archived: 'bg-blue-500',
}
</script>

<template>
  <div class="border-b">
    <div class="border-b px-4 py-2">
      <span class="font-medium text-muted-foreground text-xs">Ostatnie dokumenty</span>
    </div>

    <div
      v-for="(doc, index) in documents"
      :key="doc.uuid"
      class="px-4 py-3 transition-colors hover:bg-muted/50"
      :class="{ 'border-b': index < documents.length - 1 }"
    >
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <FileTextIcon class="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span class="font-medium text-sm">{{ doc.title }}</span>
            <span class="size-1.5 rounded-full" :class="statusColor[doc.status]" />
          </div>
          <div class="mt-0.5 flex items-center gap-2 text-muted-foreground text-xs">
            <span>{{ doc.patient }}</span>
            <span>·</span>
            <Badge variant="secondary" class="h-4 px-1.5 font-normal text-[10px]">
              {{ doc.category }}
            </Badge>
          </div>
        </div>
        <span class="shrink-0 font-mono text-muted-foreground text-xs tabular-nums uppercase">
          {{ doc.fileType }} · {{ doc.fileSize }}
        </span>
      </div>
    </div>
  </div>
</template>
