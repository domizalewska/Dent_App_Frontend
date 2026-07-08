<script setup lang="ts">
interface Props {
  title: string[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row w-full justify-between items-center border-b border-border mb-4">
      <h2 class="scroll-m-20 text-3xl font-semibold text-foreground tracking-tight flex items-center gap-3">
        <template v-for="(part, i) in props.title" :key="i">
          <span :class="i > 0 ? 'text-muted-foreground font-normal' : ''">{{ part }}</span>
          <Separator v-if="i < props.title.length - 1" orientation="vertical" class="h-7" />
        </template>
      </h2>
      <div id="header-page-buttons" class="flex items-center gap-2 mb-2" />
    </div>
  </div>
</template>
