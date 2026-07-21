<script setup lang="ts">
import { formatDateToString } from '~/utils/formatDate'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [group: MessageGroupType] }>()
</script>

<template>
  <button
    type="button"
    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
    @click="emit('select', group)"
  >
    <div class="relative shrink-0">
      <div class="flex items-center">
        <BaseUserAvatar
          v-for="(user, index) in props.group.users.slice(0, 3)"
          :key="user.uuid"
          :user="user"
          size="size-7"
          :class="index > 0 ? '-ml-2 ring-2 ring-background' : ''"
        />
      </div>
      <span
        v-if="group.unread_count && group.unread_count > 0"
        class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
      >
        {{ group.unread_count > 9 ? '9+' : group.unread_count }}
      </span>
    </div>

    <div class="flex flex-col min-w-0 flex-1 gap-0.5">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-medium truncate">{{ group.name }}</span>
        <span class="text-[11px] text-muted-foreground shrink-0">
          {{ group.last_message ? formatDateToString(group.last_message.created_at, 'HH:mm') : '' }}
        </span>
      </div>
      <span class="text-xs text-muted-foreground truncate">
        <span v-if="group.last_message" class="font-medium">
          {{ group.last_message.user.first_name }}:
        </span>
        {{ group.last_message?.message ?? 'Brak wiadomości' }}
      </span>
    </div>
  </button>
</template>
