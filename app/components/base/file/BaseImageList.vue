<script setup lang="ts">
import { Download, Eye, ImageIcon, Trash } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import type { FileItem } from '~/types/file/file.type'
import { formatBaseToBlob } from '~/utils/formatBaseToBlob'
import { formatDateToString } from '~/utils/formatDate'

interface Props {
  endpoint: string
  downloadUrl: (fileUuid: string) => string
  deleteUrl: (fileUuid: string) => string
}

const props = defineProps<Props>()

const { data: fileData, pending, error, refresh } = usePaginatedAPI<FileItem>(() => props.endpoint, { key: props.endpoint })

defineExpose({ refresh })

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

const deleteConfirmOpen = ref(false)
const fileToDelete = ref<FileItem | null>(null)

function confirmDelete(file: FileItem) {
  fileToDelete.value = file
  deleteConfirmOpen.value = true
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
    toast('Błąd podglądu', { description: 'Nie udało się załadować zdjęcia', style: toastErrorStyle })
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
    toast('Błąd pobierania', { description: 'Nie udało się pobrać zdjęcia', style: toastErrorStyle })
  }
}

async function deleteFile() {
  if (!fileToDelete.value) return
  try {
    await api(props.deleteUrl(fileToDelete.value.uuid), { method: 'DELETE' })
    toast('Zdjęcie usunięte', { style: toastSuccessStyle })
    await refresh()
  }
  catch {
    toast('Błąd usuwania', { description: 'Nie udało się usunąć zdjęcia', style: toastErrorStyle })
  }
  finally {
    fileToDelete.value = null
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <p v-if="error" class="py-4 text-center text-sm text-destructive">
      Nie udało się załadować zdjęć
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
        <div class="h-8 w-20 shrink-0 rounded bg-muted" />
      </div>
    </template>

    <template v-else>
      <div
        v-for="file in fileData?.data"
        :key="file.uuid"
        class="flex items-center gap-3 rounded-lg border p-3"
      >
        <div class="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <ImageIcon class="size-5 text-muted-foreground" />
        </div>

        <div class="flex min-w-0 flex-1 flex-col gap-0.5">
          <span class="truncate text-sm font-medium">
            {{ file.filename }}.{{ file.extension }}
          </span>
          <span class="text-xs text-muted-foreground">
            {{ file.extension.toUpperCase() }} · {{ formatSize(file.size) }} · {{ formatDateToString(file?.created_at, 'dd-mmm-yyyy') }}
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="icon" class="size-8" @click="openPreview(file)">
            <Eye class="size-4" />
          </Button>
          <Button variant="ghost" size="icon" class="size-8" @click="downloadFile(file)">
            <Download class="size-4" />
          </Button>
          <Button variant="ghost" size="sm" @click="confirmDelete(file)">
            <Trash class="size-4" />
          </Button>
        </div>
      </div>

      <p v-if="!fileData?.data?.length" class="py-4 text-center text-sm text-muted-foreground">
        Brak zdjęć
      </p>
    </template>
  </div>

  <BaseImagePreviewDialog
    :open="previewOpen"
    :blob-url="previewBlobUrl"
    :filename="`${previewFile?.filename}.${previewFile?.extension}`"
    :loading="previewLoading"
    @update:open="closePreview"
  />

  <BaseDeleteConfirmDialog
    v-model="deleteConfirmOpen"
    description="Zdjęcie zostanie trwale usunięte."
    @confirm="deleteFile"
  />
</template>
