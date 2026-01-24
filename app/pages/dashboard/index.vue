<script setup lang="ts">
import SidebarComponent from '~/components/main/SidebarComponent.vue';
import { ArrowUpIcon } from 'lucide-vue-next';
</script>

<template>
  <div class="flex h-screen">
    <SidebarComponent />
    <div class="flex w-full flex-1 pt-4 pr-4">
      <div class="flex gap-2 items-start">
        <Button variant="outline" size="icon" class="rounded-full"><ArrowUpIcon /> </Button>
        <AvatarComponent class="flex items-start" />
      </div>
    </div>
  </div>
</template>
