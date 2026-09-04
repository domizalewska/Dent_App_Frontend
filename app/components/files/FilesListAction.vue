<script setup lang="ts">
import { ref } from 'vue'
import { Eye, History, Pencil, Download, Trash2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { formatBaseToBlob } from '~/utils/formatBaseToBlob'
import { toastErrorStyle, toastSuccessStyle } from '~/utils/toast'
import type { FileableType, FileModel } from '~/types/files/FilesTypes'
import FilesUploadDialog from './FilesUploadDialog.vue'
import FileRenameDialog from './FileRenameDialog.vue'

interface FileDownloadResponse {
  filename: string
  extension: string
  mime: string
  content: string
}

interface Props {
  file: FileModel
  isNested?: boolean
  apiUrl?: string
  fileableType: FileableType
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['refresh'])

const { $api } = useNuxtApp()
const api = $api as typeof $fetch

const deleteConfirmOpen = ref(false)
const uploadOpen = ref(false)
const renameOpen = ref(false)

const previewOpen = ref(false)
const previewBlobUrl = ref<string | null>(null)
const previewLoading = ref(false)

const isPdf = computed(() => props.file.mimetype === 'application/pdf')
const isImage = computed(() => props.file.mimetype.startsWith('image/'))

async function fetchBlob(): Promise<Blob | null> {
  try {
    const json = await api<FileDownloadResponse>(
      `${props.apiUrl}/file-download/${props.file.uuid}`,
    )
    return formatBaseToBlob(json.content, json.mime)
  } catch {
    return null
  }
}

async function viewFile() {
  previewLoading.value = true
  previewOpen.value = true
  const blob = await fetchBlob()
  if (blob) {
    previewBlobUrl.value = URL.createObjectURL(blob)
  } else {
    toast('Błąd podglądu', { description: 'Nie udało się załadować pliku', style: toastErrorStyle })
    previewOpen.value = false
  }
  previewLoading.value = false
}

function closePreview() {
  previewOpen.value = false
  if (previewBlobUrl.value) {
    URL.revokeObjectURL(previewBlobUrl.value)
    previewBlobUrl.value = null
  }
}

async function downloadFn() {
  const blob = await fetchBlob()
  if (!blob) {
    toast('Błąd pobierania', { description: 'Nie udało się pobrać pliku', style: toastErrorStyle })
    return
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.file.filename}.${props.file.extension}`
  a.click()
  URL.revokeObjectURL(url)
}

async function deleteFn() {
  try {
    await api(`${props.apiUrl}/file/${props.file.uuid}`, { method: 'DELETE' })
    toast('Plik usunięty', { style: toastSuccessStyle })
    emit('refresh')
  } catch {
    toast('Błąd usuwania', { description: 'Nie udało się usunąć pliku', style: toastErrorStyle })
  }
}
</script>

<template>
  <div class="flex items-center justify-end gap-0.5">
    <TooltipProvider>
      <Tooltip v-if="isPdf || isImage">
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8" @click="viewFile">
            <Eye class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Podgląd</TooltipContent>
      </Tooltip>

      <Tooltip v-if="!isNested && !disabled">
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8" @click="uploadOpen = true">
            <History class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Aktualizuj plik</TooltipContent>
      </Tooltip>

      <Tooltip v-if="!disabled">
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8" @click="renameOpen = true">
            <Pencil class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Zmień nazwę</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8" @click="downloadFn">
            <Download class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Pobierz</TooltipContent>
      </Tooltip>

      <Tooltip v-if="!disabled">
        <TooltipTrigger as-child>
          <Button variant="ghost" size="icon" class="size-8 text-destructive hover:text-destructive" @click="deleteConfirmOpen = true">
            <Trash2 class="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Usuń</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

  <!-- Preview dialog -->
  <Dialog :open="previewOpen" @update:open="closePreview">
    <DialogContent class="flex h-[90vh] max-w-4xl flex-col gap-0 p-0">
      <DialogHeader class="shrink-0 border-b px-6 py-4">
        <DialogTitle class="truncate text-sm font-medium">
          {{ file.filename }}.{{ file.extension }}
        </DialogTitle>
      </DialogHeader>
      <div class="flex-1 overflow-hidden">
        <div v-if="previewLoading" class="flex h-full items-center justify-center">
          <Spinner class="size-6 text-muted-foreground" />
        </div>
        <embed
          v-else-if="isPdf && previewBlobUrl"
          :src="previewBlobUrl"
          type="application/pdf"
          class="size-full"
        />
        <img
          v-else-if="isImage && previewBlobUrl"
          :src="previewBlobUrl"
          :alt="file.filename"
          class="size-full object-contain"
        />
      </div>
    </DialogContent>
  </Dialog>

  <!-- Upload new version dialog -->
  <FilesUploadDialog
    v-if="uploadOpen"
    :api-url="`${apiUrl}/file-new-version/${file.uuid}`"
    :fileable-type="fileableType"
    @close="uploadOpen = false"
    @success="uploadOpen = false; emit('refresh')"
  />

  <!-- Rename dialog -->
  <FileRenameDialog
    v-if="renameOpen"
    :api-url="`${apiUrl}/file/${file.uuid}`"
    :name="file.filename"
    @close="renameOpen = false"
    @success="renameOpen = false; emit('refresh')"
  />

  <!-- Delete confirm -->
  <BaseDeleteConfirmDialog
    v-model="deleteConfirmOpen"
    description="Plik zostanie trwale usunięty."
    @confirm="deleteFn"
  />
</template>
