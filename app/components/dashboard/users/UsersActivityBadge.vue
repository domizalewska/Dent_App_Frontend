<script setup lang="ts">
interface Props {
  name: string
  role: string
  initials: string
  online?: boolean
  badge?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-4 px-6 py-5 border-b border-border last:border-b-0">
    <div class="relative shrink-0">
      <div
        class="flex items-center justify-center size-12 rounded-full bg-primary/15 text-primary font-semibold text-sm"
      >
        {{ initials }}
      </div>
      <span
        class="absolute bottom-0 right-0 size-3 rounded-full border-2 border-card"
        :class="online ? 'bg-emerald-500' : 'bg-muted-foreground/40'"
      />
    </div>

    <div class="flex-1 min-w-0">
      <p class="font-semibold text-foreground">{{ name }}</p>
      <p class="text-sm text-muted-foreground">{{ role }}</p>
    </div>

    <span
      v-if="badge"
      class="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-muted text-foreground"
    >
      {{ badge }}
    </span>
  </div>
</template>
