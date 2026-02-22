<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <h2
    class="w-full scroll-m-20 border-b border-border pb-2 pt-4 text-3xl font-semibold text-foreground pl-0 tracking-tight mb-4 transition-colors first:mt-0"
  >
    {{ props.title }}
  </h2>
</template>
