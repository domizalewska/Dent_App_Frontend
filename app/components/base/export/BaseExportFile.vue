<script setup lang="ts">
import { toast } from 'vue-sonner'
import { type ExportType, FileExtensions } from '~/types'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue'

const { $api } = useNuxtApp()

interface Props {
  extensions: ExportType[]
  endpoint: string
  params?: Record<string, unknown>
  fileName?: string
}

const props = withDefaults(defineProps<Props>(), {
  fileName: 'export',
  params: undefined,
})


async function exportFile(extension: ExportType) {
  const download = async () => {
    const response = await $api(props.endpoint, {
      method: 'GET',
      responseType: 'blob',
      params: {
        type: extension,
        ...props.params,
      },
    })

    const blob = response

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${props.fileName}${FileExtensions[extension]}`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  }

  toast.promise(download(), {
    loading: 'Pobieranie pliku...',
    success: `Pobrano plik ${props.fileName}${FileExtensions[extension]}`,
    error: 'Błąd podczas pobierania pliku',
  })
}
</script>

<template>
  <ButtonGroup>
    <Button variant="outline" class="cursor-default!">
      Eksportuj
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="outline" size="icon" aria-label="More Options">
          <Icon icon="tabler:dots" class="size-5"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-52">
        <DropdownMenuGroup>
          <div v-for="extension in extensions" :key="extension">
            <DropdownMenuItem class="cursor-pointer" @click="exportFile(extension)" >
              <Icon icon="prime:file-export" class="size-5"/>
              {{ extension }}
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </ButtonGroup>

</template>
