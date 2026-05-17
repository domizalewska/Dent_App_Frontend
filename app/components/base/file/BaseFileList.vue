<script setup lang="ts">
import { Download, Eye, FileText } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { toastErrorStyle } from '~/utils/toast'

interface FileItem {
  uuid: string
  filename: string
  extension: string
  size: string
  created_at: string
  mimetype: string
  is_latest: boolean
  user: {
    uuid: string
    first_name: string
    last_name: string
  }
}

interface Props {
  endpoint: string
  downloadUrl: (fileUuid: string) => string
}

const props = defineProps<Props>()

const { data, pending, error } = usePaginatedAPI<FileItem>(() => props.endpoint)

const { $api } = useNuxtApp()
const api = $api as typeof $fetch

const iconBg: Record<string, string> = {
  pdf: 'bg-blue-500/15',
  docx: 'bg-green-500/15',
  doc: 'bg-green-500/15',
}

const iconColor: Record<string, string> = {
  pdf: 'text-blue-500',
  docx: 'text-green-500',
  doc: 'text-green-500',
}

function formatSize(bytes: string): string {
  const b = Number(bytes)
  if (b < 1024) return `${b} B`
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} kB`
  return `${(b / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

async function downloadFile(file: FileItem) {
  try {
    const blob = await api<Blob>(props.downloadUrl(file.uuid), { responseType: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file.filename}.${file.extension}`
    a.click()
    URL.revokeObjectURL(url)
  }
  catch {
    toast('Błąd pobierania', { description: 'Nie udało się pobrać pliku', style: toastErrorStyle })
  }
}

async function previewFile(file: FileItem) {
  const tab = window.open('', '_blank')
  try {
    const blob = await api<Blob>(props.downloadUrl(file.uuid), { responseType: 'blob' })
    const url = URL.createObjectURL(blob)
    if (tab) {
      tab.location.href = url
      setTimeout(() => URL.revokeObjectURL(url), 30000)
    }
  }
  catch {
    tab?.close()
    toast('Błąd podglądu', { description: 'Nie udało się otworzyć pliku', style: toastErrorStyle })
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <p v-if="error" class="py-4 text-center text-sm text-destructive">
      Nie udało się załadować dokumentów
    </p>

    <template v-else-if="pending">
      <div
        v-for="i in 3"
        :key="i"
        class="flex animate-pulse items-center gap-3 rounded-lg border p-3"
      >
        <div class="size-10 shrink-0 rounded-lg bg-muted" />
        <div class="flex flex-1 flex-col gap-1.5">
          <div class="h-3.5 w-1/2 rounded bg-muted" />
          <div class="h-3 w-1/3 rounded bg-muted" />
        </div>
        <div class="h-6 w-20 shrink-0 rounded-full bg-muted" />
      </div>
    </template>

    <template v-else-if="!error">
      <div
        v-for="file in data?.items"
        :key="file.uuid"
        class="flex items-center gap-3 rounded-lg border p-3"
      >
        <div
          :class="[
            'size-10 rounded-lg flex items-center justify-center shrink-0',
            iconBg[file.extension] ?? 'bg-muted',
          ]"
        >
          <FileText
            class="size-5"
            :class="iconColor[file.extension] ?? 'text-muted-foreground'"
          />
        </div>

        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="truncate text-sm font-medium">
            {{ file.filename }}.{{ file.extension }}
          </span>
          <span class="text-xs text-muted-foreground">
            {{ file.extension.toUpperCase() }} · {{ formatSize(file.size) }} · {{ formatDate(file.created_at) }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1">
          <span
            v-if="file.is_latest"
            class="rounded-full border border-green-500/30 bg-green-500/15 px-3 py-1 text-xs font-medium text-green-500"
          >
            Aktualna
          </span>
          <Button variant="ghost" size="icon" class="size-8" @click="previewFile(file)">
            <Eye class="size-4" />
          </Button>
          <Button variant="ghost" size="icon" class="size-8" @click="downloadFile(file)">
            <Download class="size-4" />
          </Button>
        </div>
      </div>

      <p v-if="!data?.items?.length" class="py-4 text-center text-sm text-muted-foreground">
        Brak dokumentów
      </p>
    </template>
  </div>
</template>
