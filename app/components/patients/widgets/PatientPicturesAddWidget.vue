<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useDropZone } from '@vueuse/core'
import { Camera } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

interface PhotoType {
  uuid: string
  name: string
  url: string
}

const MAX_FILES = 10
const MAX_SIZE = 10 * 1024 * 1024

const photos = ref<PhotoType[]>([
  { uuid: '1', name: 'Panorama 03.2025', url: '' },
  { uuid: '2', name: 'Zgryz boczny 04.2025', url: '' },
])

const dropZoneRef = useTemplateRef('dropZoneRef')
const fileInput = useTemplateRef('fileInput')

function addFiles(incoming: File[] | null) {
  if (!incoming) return
  for (const file of incoming) {
    if (!file.type.startsWith('image/')) {
      toast('Nieprawidłowy format', { description: 'Akceptowane są tylko pliki graficzne' })
      continue
    }
    if (file.size > MAX_SIZE) {
      toast('Plik za duży', { description: `"${file.name}" przekracza 10MB` })
      continue
    }
    if (photos.value.length >= MAX_FILES) {
      toast('Limit zdjęć', { description: `Maksymalnie ${MAX_FILES} zdjęć` })
      break
    }
    photos.value.push({
      uuid: crypto.randomUUID(),
      name: file.name.replace(/\.[^.]+$/, ''),
      url: URL.createObjectURL(file),
    })
  }
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: addFiles,
  dataTypes: ['image/jpeg', 'image/png', 'image/webp'],
  multiple: true,
})

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) addFiles(Array.from(input.files))
}
</script>

<template>
  <Card class="overflow-hidden rounded-lg">
    <CardHeader class="px-6 pt-4 pb-0">
      <CardTitle class="text-sm font-medium text-muted-foreground tracking-wide uppercase">
        Zdjęcia RTG i foto intraoralne
      </CardTitle>
    </CardHeader>
    <CardContent class="px-6 pt-3 pb-4">
      <div
        ref="dropZoneRef"
        class="grid grid-cols-4 gap-3 transition-colors rounded-lg"
        :class="isOverDropZone ? 'bg-primary/5' : ''"
      >
        <div
          v-for="photo in photos"
          :key="photo.uuid"
          class="aspect-square rounded-lg bg-secondary border flex flex-col items-center justify-center gap-2 overflow-hidden cursor-pointer"
        >
          <img v-if="photo.url" :src="photo.url" :alt="photo.name" class="size-full object-cover" />
          <template v-else>
            <Camera class="size-6 text-blue-400" />
            <span class="text-xs text-muted-foreground text-center px-2">{{ photo.name }}</span>
          </template>
        </div>

        <div
          v-for="i in Math.max(1, 4 - photos.length)"
          :key="`add-${i}`"
          class="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-muted-foreground/50 transition-colors"
          @click="fileInput?.click()"
        >
          <span class="text-xl text-muted-foreground">+</span>
          <span class="text-xs text-muted-foreground">Dodaj</span>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
    </CardContent>
  </Card>
</template>
