<script setup lang="ts">
import { Download, Eye, FileText } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { toastErrorStyle } from '~/utils/toast'
import type { FileItem } from '~/types/file/file.type'
import { formatBaseToBlob } from '~/utils/formatBaseToBlob'
import { formatDateToString } from '~/utils/formatDate'

interface Props {
  endpoint: string
  downloadUrl: (fileUuid: string) => string
}

const props = defineProps<Props>()

const { data: fileData, pending, error } = usePaginatedAPI<FileItem>(() => props.endpoint, { key: props.endpoint })

interface FileDownloadResponse {
  filename: string
  extension: string
  mime: string
  content: string
}

const { $api } = useNuxtApp()
const api = $api as typeof $fetch


const previewOpen = ref(false)
const previewBlobUrl = ref<string | null>(null)
const previewFile = ref<FileItem | null>(null)
const previewLoading = ref(false)

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


function closePreview() {
  previewOpen.value = false
  if (previewBlobUrl.value) {
    URL.revokeObjectURL(previewBlobUrl.value)
    previewBlobUrl.value = null
  }
  previewFile.value = null
}

async function openPreview(file: FileItem) {
  previewFile.value = file
  previewBlobUrl.value = null
  previewLoading.value = true
  previewOpen.value = true

  try {
    const json = await api<FileDownloadResponse>(props.downloadUrl(file.uuid))
    previewBlobUrl.value = URL.createObjectURL(formatBaseToBlob(json.content, json.mime))
  }
  catch {
    toast('Błąd podglądu', { description: 'Nie udało się załadować pliku', style: toastErrorStyle })
    previewOpen.value = false
  }
  finally {
    previewLoading.value = false
  }
}

async function downloadFile(file: FileItem) {
  try {
    const json = await api<FileDownloadResponse>(props.downloadUrl(file.uuid))
    const url = URL.createObjectURL(formatBaseToBlob(json.content, json.mime))
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

    <template v-else>
      <div
        v-for="file in fileData?.data"
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
            {{ file.extension.toUpperCase() }} · {{ formatSize(file.size) }} · {{ formatDateToString(file.created_at) }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1">
          <span
            v-if="file.is_latest"
            class="rounded-full border border-green-500/30 bg-green-500/15 px-3 py-1 text-xs font-medium text-green-500"
          >
            Aktualna
          </span>
          <Button variant="ghost" size="icon" class="size-8" @click="openPreview(file)">
            <Eye class="size-4" />
          </Button>
          <Button variant="ghost" size="icon" class="size-8" @click="downloadFile(file)">
            <Download class="size-4" />
          </Button>
        </div>
      </div>

      <p v-if="!fileData?.data?.length" class="py-4 text-center text-sm text-muted-foreground">
        Brak dokumentów
      </p>
    </template>
  </div>

  <Dialog :open="previewOpen" @update:open="closePreview">
    <DialogContent class="max-w-4xl h-[90vh] flex flex-col gap-0 p-0">
      <DialogHeader class="px-6 py-4 border-b shrink-0">
        <DialogTitle class="text-sm font-medium truncate">
          {{ previewFile?.filename }}.{{ previewFile?.extension }}
        </DialogTitle>
      </DialogHeader>

      <div class="flex-1 overflow-hidden">
        <div v-if="previewLoading" class="flex h-full items-center justify-center">
          <Spinner class="size-6 text-muted-foreground" />
        </div>

        <template v-else-if="previewBlobUrl">
          <embed
            v-if="previewFile?.extension === 'pdf'"
            :src="previewBlobUrl"
            type="application/pdf"
            class="size-full"
          />
          <div v-else class="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
            <FileText class="size-12" />
            <p class="text-sm">Podgląd niedostępny dla tego formatu</p>
            <Button variant="outline" size="sm" @click="previewFile && downloadFile(previewFile)">
              <Download class="mr-2 size-4" />
              Pobierz plik
            </Button>
          </div>
        </template>
      </div>
    </DialogContent>
  </Dialog>
</template>
