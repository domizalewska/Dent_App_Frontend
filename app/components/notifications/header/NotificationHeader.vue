<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'
import { useNotificationStore } from '~/composables/notifications/useNotification'

const store = useNotificationStore()
</script>

<template>
  <div class="flex justify-between items-center px-4 py-3 border-b border-border">
    <span class="font-semibold text-sm">Powiadomienia</span>
    <Button variant="ghost" size="sm" class="h-7 text-xs gap-1.5" @click="store.markAsRead()">
      <CheckIcon class="size-3.5" />
      Oznacz wszystkie jako odczytane
    </Button>
  </div>
</template>
