<script setup lang="ts">
interface Props {
  tooltip: string
  variant?: 'outline' | 'default' | 'ghost'
  side?: 'top' | 'bottom' | 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  variant: 'outline',
  side: 'top'
})
</script>

<template>
  <Tooltip >
    <TooltipTrigger >
      <Button :variant="variant" size="icon" class="rounded-full">
        <slot />
        <span class="sr-only">{{ tooltip }}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent :side='side' class="px-2 py-1 text-xs">{{ tooltip }}</TooltipContent>
  </Tooltip>
</template>