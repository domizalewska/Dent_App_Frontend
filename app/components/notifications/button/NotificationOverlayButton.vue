<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { useNotificationStore } from '~/composables/notifications/useNotification'

const store = useNotificationStore()

await callOnce('notifications', () => store.fetch(), { mode: 'navigation' })
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" class="rounded-full">
        <Bell />
        <span
          v-if="store.unreadCount > 0"
          class="absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 min-w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold px-0.5"
        >
          {{ store.unreadCount > 99 ? '99+' : store.unreadCount }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[400px]" align="end">
      <NotificationHeader />

      <div v-if="store.isLoading" class="flex flex-col gap-2 p-3">
        <Skeleton v-for="n in 5" :key="n" class="h-[70px] w-full rounded-md" />
      </div>

      <div
        v-else-if="!store.notifications.length"
        class="flex justify-center items-center py-10 text-sm text-muted-foreground"
      >
        Brak powiadomień
      </div>

      <ScrollArea v-else class="h-[360px]">
        <NotificationItems
          v-for="notification in store.notifications"
          :key="notification.uuid"
          :notification="notification"
        />
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>
