<script setup lang="ts">
import { formatDateToString } from '~/utils/formatDate'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [group: MessageGroupType] }>()

const { user: currentUser } = useAuth()
const otherUser = computed(() =>
  props.group.users.find((u) => u.uuid !== currentUser.value?.uuid) ?? props.group.users[0],
)
</script>

<template>
  <button
    type="button"
    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left border-b border-border last:border-b-0"
    @click="emit('select', group)"
  >
    <div class="relative shrink-0">
      <BaseUserAvatar v-if="otherUser" :user="otherUser" />
      <span
        v-if="group.unread_count && group.unread_count > 0"
        class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
      >
        {{ group.unread_count > 9 ? '9+' : group.unread_count }}
      </span>
    </div>

    <div class="flex flex-col min-w-0 flex-1 gap-0.5">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm font-medium truncate">{{ otherUser?.first_name }} {{ otherUser?.last_name }}</span>
        <span class="text-[11px] text-muted-foreground shrink-0">
          {{ group.last_message ? formatDateToString(group.last_message.created_at, 'HH:mm') : '' }}
        </span>
      </div>
      <span class="text-xs text-muted-foreground truncate">
        {{ group.last_message?.message ?? 'Brak wiadomości' }}
      </span>
    </div>
  </button>
</template>
