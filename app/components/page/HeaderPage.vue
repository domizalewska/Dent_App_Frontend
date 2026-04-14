<script setup lang="ts">
interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row w-full justify-between items-center border-b border-border mb-4">
      <h2 class="scroll-m-20 text-3xl font-semibold text-foreground tracking-tight">
        {{ props.title }}
      </h2>
      <div id="header-page-buttons" class="flex items-center gap-2" />
    </div>
  </div>
</template>
