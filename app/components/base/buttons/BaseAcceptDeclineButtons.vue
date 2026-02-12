<script setup lang="ts">
interface Props {
  acceptTitle?: string;
  declineTitle?: string;
}

defineProps<Props>();
</script>
<template>
  <div class="flex flex-wrap items-center gap-2 md:flex-row">
    <Button variant="outline" >
      <span class="text-color font-medium text-xl">{{ declineTitle }}</span>
    </Button>
    <Button variant="outline" >
      <span class="text-color font-medium text-xl">{{ declineTitle }}</span>
    </Button>
  </div>
</template>
