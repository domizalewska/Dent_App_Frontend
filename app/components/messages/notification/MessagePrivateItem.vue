<script setup lang="ts">
import { formatDateToString } from '~/utils/formatDate'
import type { MessageType, User } from '~/types'

interface Props {
  user: User
  unreadCount?: number
  lastMessage?: MessageType
}

defineProps<Props>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <div class="bg-background">
    <button
      type="button"
      class="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
      @click="emit('select')"
    >
      <div class="relative shrink-0">
        <BaseUserAvatar :user="user" show-status />
        <span
          v-if="unreadCount && unreadCount > 0"
          class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
        >
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </div>

      <div class="flex flex-col min-w-0 flex-1 gap-0.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-sm font-medium truncate"
            >{{ user.first_name }} {{ user.last_name }}</span
          >
          <span class="text-[11px] text-muted-foreground shrink-0">
            {{ lastMessage ? formatDateToString(lastMessage.created_at, 'HH:mm') : '' }}
          </span>
        </div>
        <span class="text-xs text-muted-foreground truncate">
          {{ lastMessage?.message ?? 'Brak wiadomości' }}
        </span>
      </div>
    </button>
  </div>
</template>
