<script setup lang="ts">
import BaseTableSearch from '~/components/base/search/BaseTableSearch.vue'
import MessageNotificationItems from '~/components/messages/notification/MessageNotificationItems.vue'
import { mockMessageGroups } from '~/mock/messages/mockMessages'
import type { MessageGroupType } from '~/types'

const emit = defineEmits<{ select: [group: MessageGroupType] }>()
const search = ref<string | null>(null)
</script>
<template>
  <div class="flex justify-between items-center p-4 border-b border-border">
    <span class="font-semibold text-sm">Wiadomości</span>
  </div>
  <div class="flex w-full items-center px-4 py-3">
    <BaseTableSearch class="w-full" :model-value="search" @search="search = $event" />
  </div>
  <ScrollArea class="h-[360px]">
    <MessageNotificationItems
      v-for="group in mockMessageGroups"
      :key="group.uuid"
      :group="group"
      @select="emit('select', $event)"
    />
  </ScrollArea>
</template>
