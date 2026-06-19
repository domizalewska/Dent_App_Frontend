<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  type Updater,
  useVueTable
} from '@tanstack/vue-table'

import { valueUpdater } from '@/components/ui/table/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import DataTablePaginator from '~/components/ui/data-table/data-table-paginator.vue'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  sorting?: SortingState;
  onSortingChange?: (updaterOrValue: Updater<SortingState>) => void;
  totalItems?: number
  currentPage?: number
  perPage?: number
}>();

const emit = defineEmits<{ 'update:page': [page: number] }>()

const internalSorting = ref<SortingState>([])

const currentSorting = computed(() => props.sorting ?? internalSorting.value)

function handleSortingChange(updaterOrValue: Updater<SortingState>) {
  if (props.onSortingChange) {
    props.onSortingChange(updaterOrValue)
  } else {
    valueUpdater(updaterOrValue, internalSorting)
  }
}

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  manualPagination: true,
  get manualSorting() { return !!props.onSortingChange },
  onSortingChange: handleSortingChange,
  state: {
    get sorting() { return currentSorting.value },
  }
});

function handleRowClick(row: TData, event: MouseEvent) {
  if ((event.target as HTMLElement).closest('button')) return
  if (props.onRowClick) {
    props.onRowClick(row)
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between">
    <div class="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="font-normal border-b border-border"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="font-normal border-b border-border cursor-pointer"
              @click="handleRowClick(row.original, $event)"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex items-center justify-center py-4 space-x-2 shrink-0">
      <DataTablePaginator
        :current-page="currentPage ?? 1"
        :total-items="totalItems ?? 0"
        :per-page="perPage ?? 15"
        @update:page="emit('update:page', $event)"
      />
    </div>
  </div>
</template>
