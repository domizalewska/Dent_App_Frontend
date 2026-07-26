<script setup lang="ts">
import type { MessageGroupType, User } from '~/types'

interface Props {
  group?: MessageGroupType
  user?: User
}

defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { messages, privateMessages, isLoadingMessages, selectedGroup, selectGroup, selectUser } =
  useMessages()

const displayMessages = computed(() =>
  selectedGroup.value ? messages.value : privateMessages.value,
)
</script>

<template>
  <Card
    class="fixed bottom-4 right-4 w-[620px] h-[480px] flex flex-col shadow-2xl border border-border z-50 rounded-lg overflow-hidden p-0 gap-0"
  >
    <div class="flex flex-1 min-h-0">
      <MessageChatUsersList
        :selected-uuid="selectedGroup?.uuid"
        @select="selectGroup"
        @select-user="selectUser"
      />

      <div class="flex flex-col flex-1 min-w-0">
        <MessageChatHeader
          v-if="selectedGroup || user"
          :group="selectedGroup"
          :user="user"
          @close="emit('close')"
        />
        <MessageChatContent :messages="displayMessages" :is-loading="isLoadingMessages" />
      </div>
    </div>
  </Card>
</template>
