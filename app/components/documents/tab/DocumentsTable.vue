<script setup lang="ts">
import { toast } from 'vue-sonner'
import DataTable from '~/components/ui/data-table/data-table.vue'
import BaseTableSkeleton from '~/components/base/skeleton/table/BaseTableSkeleton.vue'
import { getDocumentsColumns, DocumentsEndpoints, documentsKey } from '~/features/documents'
import type { Document, DocumentTargetType } from '~/types'
import { toastErrorStyle } from '~/utils/toast'
import { formatBaseToBlob } from '~/utils/formatBaseToBlob'

interface Props {
  targetType: DocumentTargetType
  search: string
}

const props = defineProps<Props>()

const { $api } = useNuxtApp()
const api = $api as typeof $fetch

interface FileDownloadResponse {
  filename: string
  extension: string
  mime: string
  content: string
}

async function downloadDocument(doc: Document) {
  try {
    const json = await api<FileDownloadResponse>(DocumentsEndpoints.DOWNLOAD(doc.uuid))
    const url = URL.createObjectURL(formatBaseToBlob(json.content, json.mime))
    const a = document.createElement('a')
    a.href = url
    a.download = `${json.filename}.${json.extension}`
    a.click()
    URL.revokeObjectURL(url)
  }
  catch {
    toast('Błąd pobierania', { description: 'Nie udało się pobrać dokumentu', style: toastErrorStyle })
  }
}

const columns = getDocumentsColumns(downloadDocument)

const stateKey = `${documentsKey}-${props.targetType}`

const { paramsData, setPage, setSort, sortingState } = usePagination({
  stateKey,
  initialSort: 'created_at,desc',
})

const { data: documentsData, status } = await usePaginatedAPI<Document>(DocumentsEndpoints.BASE, {
  key: stateKey,
  paramsData: computed(() => ({
    ...paramsData.value,
    target_type: props.targetType,
    search: props.search || undefined,
  })),
})
</script>

<template>
  <BaseTableSkeleton v-if="status === 'pending'" :columns="6" />

  <DataTable
    v-if="documentsData"
    :columns="columns"
    :data="documentsData.data"
    :total-items="documentsData.pagination.total"
    :current-page="documentsData.pagination.current_page"
    :per-page="documentsData.pagination.per_page"
    :sorting="sortingState"
    :on-sorting-change="setSort"
    @update:page="setPage"
  />
</template>
