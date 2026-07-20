<script setup lang="ts">
import { MinusIcon, XIcon } from 'lucide-vue-next'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

defineProps<Props>()
const emit = defineEmits<{ minimize: []; close: [] }>()

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <div class="flex items-center justify-between border-b border-border bg-card px-4 py-3">
    <div class="flex items-center gap-2 min-w-0">
      <Avatar class="size-8 shrink-0">
        <AvatarFallback class="bg-primary/10 text-xs font-medium">
          {{ initials(group.name) }}
        </AvatarFallback>
      </Avatar>
      <div class="min-w-0">
        <p class="truncate text-sm font-semibold text-foreground">{{ group.name }}</p>
        <p v-if="group.users?.length" class="text-xs text-muted-foreground truncate">
          {{ group.users.map((u) => `${u.first_name} ${u.last_name}`).join(', ') }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-1 shrink-0">
      <button
        type="button"
        class="flex size-7 items-center justify-center rounded hover:bg-accent"
        aria-label="Minimalizuj"
        @click="emit('minimize')"
      >
        <MinusIcon class="size-3.5" />
      </button>
      <button
        type="button"
        class="flex size-7 items-center justify-center rounded hover:bg-destructive/10 text-destructive"
        aria-label="Zamknij"
        @click="emit('close')"
      >
        <XIcon class="size-3.5" />
      </button>
    </div>
  </div>
</template>
