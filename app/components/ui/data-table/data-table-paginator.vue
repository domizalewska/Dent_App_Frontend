<script setup lang="ts" generic="TData, TValue">
import type { Table } from '@tanstack/vue-table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'

interface DataTablePaginationProps {
  table: Table<TData>
}

const { table } = defineProps<DataTablePaginationProps>()

const currentPage = computed(() => table.getState().pagination.pageIndex + 1)
const pageCount = computed(() => table.getPageCount())

function onPageChange(page: number) {
  table.setPageIndex(page - 1)
}
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <Pagination
      :page="currentPage"
      :total="pageCount * table.getState().pagination.pageSize"
      :items-per-page="table.getState().pagination.pageSize"
      :sibling-count="1"
      show-edges
      @update:page="onPageChange"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious>
          <ChevronLeftIcon />
          <span class="hidden sm:block">Poprzednia</span>
        </PaginationPrevious>

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === currentPage"
          >
            {{ item.value }}
          </PaginationItem>
          <PaginationEllipsis v-else :index="index" />
        </template>

        <PaginationNext>
          <span class="hidden sm:block">Następna</span>
          <ChevronRightIcon />
        </PaginationNext>
      </PaginationContent>
    </Pagination>

    <div class="flex items-center space-x-2">
      <Select
        :model-value="`${table.getState().pagination.pageSize}`"
        @update:model-value="table.setPageSize"
      >
        <SelectTrigger class="h-8 w-[70px]">
          <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem
            v-for="pageSize in [10, 20, 30, 40, 50]"
            :key="pageSize"
            :value="`${pageSize}`"
            class="font-normal"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
