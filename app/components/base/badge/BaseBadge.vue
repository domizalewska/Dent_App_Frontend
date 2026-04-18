<script setup lang="ts">

interface Props {
  label: string
  badgeClass?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex w-full flex-wrap gap-2">
    <Badge :class="badgeClass" >
      <slot name="icon"/>
      {{label}}
    </Badge>
  </div>
</template>
