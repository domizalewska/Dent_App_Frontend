<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';

interface Props {
  currentPage: number
  totalItems: number
  perPage: number
}

defineProps<Props>()
const emit = defineEmits<{ 'update:page': [page: number] }>()
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <Pagination
      :page="currentPage"
      :total="totalItems"
      :items-per-page="perPage"
      :sibling-count="1"
      show-edges
      @update:page="emit('update:page', $event)"
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
  </div>
</template>