<script setup lang="ts">
interface Props {
  acceptTitle?: string
  declineTitle?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full flex-row flex-wrap items-center mt-4 gap-2">
    <Button variant='secondary' class="w-full md:flex-1" size="sm">
      <span class="text-color font-medium text-sm">{{ declineTitle }}</span>
    </Button>
    <Button class="w-full md:flex-1" size="sm">
      <span class="text-color font-medium text-sm">{{ acceptTitle }}</span>
    </Button>
  </div>
</template>
