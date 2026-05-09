<script setup lang="ts">
import { useDropZone } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { Upload, X } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

const MAX_FILES = 5
const MAX_SIZE = 5 * 1024 * 1024

const files = ref<File[]>([])
const dropZoneRef = useTemplateRef('dropZoneRef')
const fileInput = useTemplateRef('fileInput')

function addFiles(incoming: File[] | null) {
  if (!incoming) return
  for (const file of incoming) {
    if (file.size > MAX_SIZE) {
      toast('Plik za duży', {
        description: `"${file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}" przekracza 5MB`,
      })
      continue
    }
    if (files.value.length >= MAX_FILES) {
      toast('Limit plików', { description: `Maksymalnie ${MAX_FILES} plików` })
      break
    }
    if (!files.value.find(f => f.name === file.name && f.size === file.size)) {
      files.value.push(file)
    }
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: addFiles,
  dataTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  multiple: true,
  preventDefaultForUnhandled: false,
})

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full">

    <div
      ref="dropZoneRef"
      class="rounded-lg border-2 border-dashed p-6 flex flex-col items-center gap-3 text-center transition-colors cursor-pointer"
      :class="isOverDropZone ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50'"
      @click="fileInput?.click()"
    >
      <div class="flex items-center justify-center rounded-full border p-2.5">
        <Upload class="size-6 text-muted-foreground" />
      </div>
      <div>
        <p class="text-sm font-medium">Przeciągnij pliki tutaj</p>
        <p class="text-xs text-muted-foreground mt-0.5">
          lub kliknij aby wybrać (max {{ MAX_FILES }} plików, do 5MB każdy)
        </p>
      </div>
      <Button variant="outline" size="sm" class="w-fit" @click.stop="fileInput?.click()">
        Wybierz pliki
      </Button>
    </div>

    <input
      ref="fileInput"
      type="file"
      multiple
      accept=".pdf,.docx"
      class="hidden"
      @change="onFileChange"
    />

    <div v-if="files.length" class="flex flex-col gap-2">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center gap-3 rounded-lg border p-3"
      >
        <div class="size-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
          <span class="text-xs font-medium text-muted-foreground uppercase">
            {{ file.name.split('.').pop() }}
          </span>
        </div>
        <div class="flex flex-col gap-0.5 flex-1 min-w-0">
          <span class="text-sm font-medium truncate">{{ file.name }}</span>
          <span class="text-xs text-muted-foreground">{{ formatSize(file.size) }}</span>
        </div>
        <Button variant="ghost" size="icon" class="size-7 shrink-0" @click="removeFile(index)">
          <X class="size-4" />
        </Button>
      </div>
    </div>

  </div>
</template>