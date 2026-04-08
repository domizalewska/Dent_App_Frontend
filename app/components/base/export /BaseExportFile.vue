<script setup lang="ts">
import { useNuxtApp } from 'nuxt/app'
import type { ExportTypes } from '~/types/export/ExportTypes'
import { FileExtensions, FileIcons } from '~/types/export/ExportTypes'

const { $api } = useNuxtApp()
const toast = useToast()

interface Props {
  extension: ExportTypes
  endpoint: string
  params?: Record<string, unknown>
  fileName?: string
}

const props = defineProps<Props>()

async function exportFile() {
  const response = await $api(props.endpoint, {
    method: 'GET',
    responseType: 'blob',
    params: {
      type: props.extension,
      ...props.params,
    },
  })
  const blob = response

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute(
    'download',
    ${props.fileName}${FileExtensions[props.extension]}
)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)

  toast.add({
    severity: 'success',
    summary: 'Sukces',
    detail: Pobrano plik ${props.fileName}${FileExtensions[props.extension]},
  life: 5000,
})
}
</script>

<template>
  <Button
    :label="extension"
    severity="secondary"
    :icon="FileIcons[extension]"
    @click="exportFile()"
  />
</template>