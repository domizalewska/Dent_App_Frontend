<script setup lang="ts">
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { messages, isLoadingMessages, selectedGroup, selectGroup } = useMessages()

onMounted(() => selectGroup(props.group))
</script>

<template>
  <Card
    class="fixed bottom-4 right-4 w-[620px] h-[480px] flex flex-col shadow-2xl border border-border z-50 rounded-lg overflow-hidden"
  >
    <div class="flex flex-1 min-h-0">
      <MessageChatUsersList :selected-uuid="selectedGroup?.uuid" @select="selectGroup" />

      <div class="flex flex-col flex-1 min-w-0">
        <MessageChatHeader v-if="selectedGroup" :group="selectedGroup" @close="emit('close')" />
        <MessageChatContent :messages="messages" :is-loading="isLoadingMessages" />
      </div>
    </div>
  </Card>
</template>
