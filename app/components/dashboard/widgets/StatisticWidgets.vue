<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  label: string
  value: string | number
  icon: Component
  trend?: {
    value: string
    direction: 'up' | 'down'
  }
  hint?: string
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <div class="flex items-start justify-between">
      <span class="text-sm text-muted-foreground">{{ label }}</span>
      <div class="flex items-center justify-center size-11 rounded-xl bg-primary/10">
        <component :is="icon" class="size-5 text-primary" />
      </div>
    </div>

    <div class="mt-3 text-4xl font-bold tracking-tight text-foreground">
      {{ value }}
    </div>

    <div class="mt-2 flex items-center gap-1 text-sm">
      <template v-if="trend">
        <TrendingUpIcon v-if="trend.direction === 'up'" class="size-3.5 text-emerald-500" />
        <TrendingDownIcon v-else class="size-3.5 text-red-500" />
        <span :class="trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'">
          {{ trend.value }}
        </span>
      </template>
      <span v-else-if="hint" class="text-muted-foreground">{{ hint }}</span>
    </div>
  </div>
</template>
