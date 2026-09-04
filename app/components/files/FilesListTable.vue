<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronRight, ChevronDown, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft } from 'lucide-vue-next'
import { usePaginatedAPI } from '~/composables/useAPI'
import { usePagination } from '~/composables/usePagination'
import { formatDateToString } from '~/composables/useDates'
import type { FileableType, FileModel } from '~/types/files/FilesTypes'
import FilesListAction from './FilesListAction.vue'
import BaseTableSearch from '../base/search/BaseTableSearch.vue'

interface Props {
  apiUrl?: string
  isNested?: boolean
  fileableType: FileableType
  disabled?: boolean
  stateKey?: string
  inDialog?: boolean
  teleport?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  apiUrl: undefined,
  disabled: false,
  stateKey: undefined,
  inDialog: false,
  teleport: true,
})

const emit = defineEmits(['refresh'])

const { pagination, paramsData, sortingState, setPage, setPerPage, setSort, setSearch } =
  usePagination({ stateKey: props.stateKey })

const expandedKeys = ref(new Set<string>())

const { data: dataFiles, status, refresh } = usePaginatedAPI<FileModel[]>(
  `${props.apiUrl}/file`,
  { query: paramsData, immediate: !!props.apiUrl && !props.isNested },
)

interface FlatRow {
  data: FileModel & { is_nested: boolean }
  depth: number
  hasChildren: boolean
}

function flattenTree(nodes: FileModel[], depth: number): FlatRow[] {
  const rows: FlatRow[] = []
  for (const node of nodes) {
    const hasChildren = (node.files?.length ?? 0) > 0
    rows.push({ data: { ...node, is_nested: depth > 0 }, depth, hasChildren })
    if (hasChildren && expandedKeys.value.has(node.uuid)) {
      rows.push(...flattenTree(node.files!, depth + 1))
    }
  }
  return rows
}

const flatRows = computed<FlatRow[]>(() =>
  dataFiles.value?.data ? flattenTree(dataFiles.value.data, 0) : [],
)

function toggleExpand(uuid: string) {
  const next = new Set(expandedKeys.value)
  if (next.has(uuid)) next.delete(uuid)
  else next.add(uuid)
  expandedKeys.value = next
}

function handleSort(field: string) {
  setSort((current) => {
    const existing = current.find((s) => s.id === field)
    if (!existing) return [{ id: field, desc: false }]
    if (!existing.desc) return [{ id: field, desc: true }]
    return []
  })
}

function sortState(field: string) {
  const s = sortingState.value.find((s) => s.id === field)
  if (!s) return 'none'
  return s.desc ? 'desc' : 'asc'
}

const totalPages = computed(() =>
  dataFiles.value
    ? Math.ceil(dataFiles.value.pagination.total / pagination.value.per_page)
    : 0,
)

function onFileRefresh() {
  if (!props.isNested) refresh()
  emit('refresh')
}

defineExpose({ refresh })
</script>

<template>
  <div class="flex flex-col gap-3">
    <Teleport v-if="!isNested && !inDialog && teleport" to="#tabs">
      <BaseTableSearch @search="setSearch" />
    </Teleport>

    <template v-if="status === 'pending' && !dataFiles">
      <div class="space-y-2">
        <Skeleton v-for="i in 5" :key="i" class="h-10 w-full rounded-md" />
      </div>
    </template>

    <template v-else-if="status === 'error'">
      <div class="flex flex-col items-center gap-2 py-10 text-sm text-muted-foreground">
        <span>Błąd podczas ładowania danych.</span>
        <Button variant="outline" size="sm" @click="refresh">Odśwież</Button>
      </div>
    </template>

    <template v-else>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="cursor-pointer select-none" @click="handleSort('filename')">
                <div class="flex items-center gap-1.5">
                  Nazwa pliku
                  <ArrowUpDown v-if="sortState('filename') === 'none'" class="size-3.5 text-muted-foreground" />
                  <ArrowUp v-else-if="sortState('filename') === 'asc'" class="size-3.5" />
                  <ArrowDown v-else class="size-3.5" />
                </div>
              </TableHead>
              <TableHead>Data dodania pliku</TableHead>
              <TableHead class="cursor-pointer select-none" @click="handleSort('user')">
                <div class="flex items-center gap-1.5">
                  Osoba załączająca plik
                  <ArrowUpDown v-if="sortState('user') === 'none'" class="size-3.5 text-muted-foreground" />
                  <ArrowUp v-else-if="sortState('user') === 'asc'" class="size-3.5" />
                  <ArrowDown v-else class="size-3.5" />
                </div>
              </TableHead>
              <TableHead class="w-[200px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="flatRows.length">
              <TableRow v-for="row in flatRows" :key="row.data.uuid">
                <TableCell>
                  <div class="flex items-center gap-1" :style="{ paddingLeft: `${row.depth * 1.5}rem` }">
                    <Button
                      v-if="row.hasChildren"
                      variant="ghost"
                      size="icon"
                      class="size-5 shrink-0"
                      @click="toggleExpand(row.data.uuid)"
                    >
                      <ChevronDown v-if="expandedKeys.has(row.data.uuid)" class="size-3.5" />
                      <ChevronRight v-else class="size-3.5" />
                    </Button>
                    <span v-else class="inline-block size-5 shrink-0" />
                    {{ row.data.filename }}.{{ row.data.extension }}
                  </div>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ formatDateToString(row.data.created_at, true) }}
                </TableCell>
                <TableCell>{{ row.data.user.name }}</TableCell>
                <TableCell>
                  <FilesListAction
                    :is-nested="row.data.is_nested"
                    :file="row.data"
                    :fileable-type="fileableType"
                    :disabled="disabled"
                    :api-url="apiUrl"
                    @refresh="onFileRefresh"
                  />
                </TableCell>
              </TableRow>
            </template>
            <TableRow v-else>
              <TableCell colspan="4" class="py-10 text-center text-sm text-muted-foreground">
                Brak dodanych plików
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div
        v-if="dataFiles"
        class="flex items-center justify-between gap-4 text-sm text-muted-foreground"
      >
        <div class="flex items-center gap-2">
          <span>Wierszy na stronę:</span>
          <Select
            :model-value="String(pagination.per_page)"
            @update:model-value="setPerPage(Number($event))"
          >
            <SelectTrigger class="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="n in [5, 10, 20, 50]" :key="n" :value="String(n)">
                {{ n }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex items-center gap-2">
          <span>
            {{ dataFiles.pagination.from }}–{{ dataFiles.pagination.to }}
            z {{ dataFiles.pagination.total }}
          </span>
          <Button
            variant="ghost"
            size="icon"
            class="size-8"
            :disabled="pagination.current_page <= 1"
            @click="setPage(pagination.current_page - 1)"
          >
            <ChevronLeft class="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="size-8"
            :disabled="pagination.current_page >= totalPages"
            @click="setPage(pagination.current_page + 1)"
          >
            <ChevronRight class="size-4" />
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>
