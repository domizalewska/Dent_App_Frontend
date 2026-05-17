<script setup lang="ts">
import { FileText } from 'lucide-vue-next'

interface FileItem {
  uuid: string
  name: string
  type: 'PDF' | 'DOCX'
  size: string
  date: string
  status: string
}

interface StatusConfig {
  label: string
  class: string
}

interface Props {
  endpoint: string
  statusConfig: Record<string, StatusConfig>
}

const props = defineProps<Props>()

const { data, pending, error } = usePaginatedAPI<FileItem>(() => props.endpoint)

const iconBg: Record<string, string> = {
  PDF: 'bg-blue-500/15',
  DOCX: 'bg-green-500/15',
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <p v-if="error" class="text-sm text-destructive text-center py-4">
      Nie udało się załadować dokumentów
    </p>

    <template v-else-if="pending">
      <div
        v-for="i in 3"
        :key="i"
        class="flex items-center gap-3 rounded-lg border p-3 animate-pulse"
      >
        <div class="size-10 rounded-lg bg-muted shrink-0" />
        <div class="flex flex-col gap-1.5 flex-1">
          <div class="h-3.5 w-1/2 rounded bg-muted" />
          <div class="h-3 w-1/3 rounded bg-muted" />
        </div>
        <div class="h-6 w-20 rounded-full bg-muted shrink-0" />
      </div>
    </template>

    <template v-else-if="!error">
      <div
        v-for="doc in data?.items"
        :key="doc.uuid"
        class="flex items-center gap-3 rounded-lg border p-3"
      >
        <div
          :class="[
            'size-10 rounded-lg flex items-center justify-center shrink-0',
            iconBg[doc.type],
          ]"
        >
          <FileText
            class="size-5"
            :class="doc.type === 'PDF' ? 'text-blue-500' : 'text-green-500'"
          />
        </div>

        <div class="flex flex-col gap-0.5 flex-1 min-w-0">
          <span class="text-sm font-medium truncate">{{ doc.name }}</span>
          <span class="text-xs text-muted-foreground">
            {{ doc.type }} · {{ doc.size }} · {{ doc.date }}
          </span>
        </div>

        <div class="shrink-0">
          <span
            :class="[
              'text-xs px-3 py-1 rounded-full font-medium',
              statusConfig[doc.status]?.class,
            ]"
          >
            {{ statusConfig[doc.status]?.label }}
          </span>
        </div>
      </div>

      <p v-if="!data?.items?.length" class="text-sm text-muted-foreground text-center py-4">
        Brak dokumentów
      </p>
    </template>
  </div>
</template>
