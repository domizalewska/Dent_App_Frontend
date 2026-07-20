<script setup lang="ts">
import { SendIcon } from 'lucide-vue-next'
import type { MessageGroupType, MessageType } from '~/types'

interface Props {
  group: MessageGroupType
  messages: MessageType[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: []; minimize: []; send: [message: string] }>()

const { user } = useAuth()
const newMessage = ref('')
const messagesEndRef = useTemplateRef('messagesEnd')

function handleSend() {
  if (!newMessage.value.trim()) return
  emit('send', newMessage.value.trim())
  newMessage.value = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    messagesEndRef.value?.scrollIntoView({ behavior: 'smooth' })
  },
)
</script>

<template>
  <Card
    class="fixed bottom-4 right-4 w-80 flex flex-col shadow-lg border border-border z-50 overflow-hidden"
  >
    <MessagePopupHeader :group="group" @minimize="emit('minimize')" @close="emit('close')" />

    <div class="h-64 flex flex-col gap-3 overflow-y-auto bg-background p-3">
      <MessageBubble
        v-for="message in messages"
        :key="message.uuid"
        :message="message"
        :is-sent="message.user_uuid === user?.uuid"
      />
      <div ref="messagesEnd" />
    </div>

    <div class="border-t border-border p-3">
      <div class="flex gap-2">
        <Input
          v-model="newMessage"
          placeholder="Wpisz wiadomość..."
          class="text-sm"
          @keydown="onKeydown"
        />
        <Button size="icon" variant="ghost" :disabled="!newMessage.trim()" @click="handleSend">
          <SendIcon class="size-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>
