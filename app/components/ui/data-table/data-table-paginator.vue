<script setup lang="ts" generic="TData, TValue">
import { type Table } from '@tanstack/vue-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-vue-next';
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps {
  table: Table<TData>;
}

const { table } = defineProps<DataTablePaginationProps>();

const MAX_PAGES = 5;

const visiblePages = computed(() => {
  const pageCount = table.getPageCount();
  const current = table.getState().pagination.pageIndex;

  if (pageCount <= MAX_PAGES) {
    return Array.from({ length: pageCount }, (_, i) => i);
  }

  const half = Math.floor(MAX_PAGES / 2);

  let start = Math.max(0, current - half);
  let end = start + MAX_PAGES;

  if (end > pageCount) {
    end = pageCount;
    start = end - MAX_PAGES;
  }

  return Array.from({ length: MAX_PAGES }, (_, i) => start + i);
});
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex w-[100px] items-center justify-center text-sm font-normal">
        Strona {{ table.getState().pagination.pageIndex + 1 }} z
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft class="w-4 h-4" />
        </Button>
        <Button
          v-for="pageIndex in visiblePages"
          :key="pageIndex"
          :variant="table.getState().pagination.pageIndex === pageIndex ? 'default' : 'outline'"
          class="w-8 h-8 p-0"
          @click="table.setPageIndex(pageIndex)"
        >
          {{ pageIndex + 1 }}
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <ChevronRight class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="w-4 h-4" />
        </Button>
      </div>
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
  </div>
</template>
