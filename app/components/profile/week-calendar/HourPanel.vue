<script setup lang="ts">
interface Props {
  timeText: string
}

defineProps<Props>()
</script>

<template>
  <Button variant="outline" size="sm" class="font-mono text-xs tabular-nums">
    {{ timeText }}
  </Button>
</template>
