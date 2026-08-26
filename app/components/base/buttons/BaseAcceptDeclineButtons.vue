<script setup lang="ts">
interface Props {
  acceptTitle?: string
  declineTitle?: string
}

defineProps<Props>()
const emit = defineEmits(['submit', 'decline'])
</script>

<template>
  <div class="flex w-full flex-row flex-wrap items-center mt-4 gap-2">
    <Button type="button" variant="secondary" class="w-full md:flex-1" size="sm" @click="emit('decline')">
      <span class="text-color font-medium text-sm">{{ declineTitle }}</span>
    </Button>
    <Button type="submit" class="w-full md:flex-1" size="sm" @click="emit('submit')">
      <span class="text-color font-medium text-sm">{{ acceptTitle }}</span>
    </Button>
  </div>
</template>
