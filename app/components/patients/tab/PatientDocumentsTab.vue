<script setup lang="ts">
import { FileText } from 'lucide-vue-next'
import BaseFileUpload from '~/components/base/file/BaseFileUpload.vue'

interface DocumentType {
  uuid: string
  name: string
  type: 'PDF' | 'DOCX'
  size: string
  date: string
  status: 'signed' | 'archived' | 'issued'
}

const documents: DocumentType[] = [
  {
    uuid: '1',
    name: 'Zgoda na leczenie — 2025',
    type: 'PDF',
    size: '12 kB',
    date: '03.04.2025',
    status: 'signed',
  },
  {
    uuid: '2',
    name: 'Wywiad ogólnomedyczny',
    type: 'PDF',
    size: '8 kB',
    date: '15.03.2021',
    status: 'archived',
  },
  {
    uuid: '3',
    name: 'Skierowanie do ortodonty',
    type: 'DOCX',
    size: '4 kB',
    date: '02.04.2025',
    status: 'issued',
  },
]

const statusConfig = {
  signed: { label: 'Podpisana', class: 'bg-secondary text-secondary-foreground' },
  archived: { label: 'Archiwalny', class: 'bg-secondary text-secondary-foreground' },
  issued: {
    label: 'Wystawione',
    class: 'bg-green-500/15 text-green-500 border border-green-500/30',
  },
}

const iconBg = {
  PDF: 'bg-blue-500/15',
  DOCX: 'bg-green-500/15',
}
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="px-6 pt-4 pb-0">
      <CardTitle class="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        Dokumenty pacjenta
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4 flex flex-col gap-3">
      <div
        v-for="doc in documents"
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
            :class="['text-xs px-3 py-1 rounded-full font-medium', statusConfig[doc.status].class]"
          >
            {{ statusConfig[doc.status].label }}
          </span>
        </div>
      </div>

      <div class="flex w-full">
        <BaseFileUpload />
      </div>
    </CardContent>
  </Card>
</template>
