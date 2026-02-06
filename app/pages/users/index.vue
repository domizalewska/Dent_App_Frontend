<script setup lang="ts">
import { columns } from '~/components/ui/data-table/columns';
import DataTable from '~/components/ui/data-table/data-table.vue';
import { generateMockUsers } from '~/mock/users/mockUsers';
import type { User } from '~/types/users/typesUsers';

definePageMeta({
  layout: 'dashboard',
});

const data = ref<User[]>([]);

async function getData(): Promise<User[]> {
  return generateMockUsers(70);
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="flex h-screen w-full">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
