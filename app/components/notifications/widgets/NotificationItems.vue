<script setup lang="ts">
import { BellIcon } from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'
import { pl } from 'date-fns/locale'
import { useNotificationStore } from '~/composables/notifications/useNotification'
import type { NotificationModel } from '~/types'

const store = useNotificationStore()
const props = defineProps<{ notification: NotificationModel }>()
const emit = defineEmits(['close'])

async function onNotificationTap() {
  if (!props.notification.read) {
    await store.markAsRead(props.notification.uuid)
  }
  if (props.notification.url) {
    const url = props.notification.url.replace(window.location.origin, '')
    await navigateTo(url)
    emit('close')
  }
}

const timeAgo = computed(() =>
  formatDistanceToNow(new Date(props.notification.created_at), { addSuffix: true, locale: pl }),
)
</script>

<template>
  <div
    class="flex gap-3 p-3 cursor-pointer hover:bg-accent border-b border-border last:border-b-0 transition-colors"
    :class="{ 'bg-muted/40': !notification.read }"
    @click="onNotificationTap"
  >
    <div class="flex items-center justify-center size-8 rounded-full bg-primary/10 shrink-0 mt-0.5">
      <BellIcon class="size-4 text-primary" />
    </div>

    <div class="flex flex-col gap-0.5 w-full min-w-0">
      <div class="flex justify-between items-start gap-2">
        <span class="text-sm font-medium leading-tight">{{ notification.title }}</span>
        <span class="text-xs text-muted-foreground shrink-0">{{ timeAgo }}</span>
      </div>
      <span class="text-xs text-muted-foreground line-clamp-2">{{ notification.message }}</span>
    </div>

    <div v-if="!notification.read" class="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
  </div>
</template>
