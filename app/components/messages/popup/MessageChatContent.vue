<script setup lang="ts">
import { SendIcon } from 'lucide-vue-next'
import { formatDateToString } from '~/utils/formatDate'
import type { MessageType } from '~/types'

interface Props {
  messages: MessageType[]
  isLoading: boolean
}

const props = defineProps<Props>()

const { user: currentUser } = useAuth()
const { sendMessage, selectedUser } = useMessages()

const newMessage = ref('')
const scrollEl = ref<HTMLElement | null>(null)

function isMine(msg: MessageType) {
  return msg.user_uuid === currentUser.value?.uuid
}

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight
  },
)

async function handleSend() {
  const text = newMessage.value.trim()
  if (!text) return
  newMessage.value = ''
  await sendMessage(text, selectedUser.value?.uuid)
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex-1 flex items-center justify-center p-4">
    <Skeleton class="h-4 w-32" />
  </div>

  <div v-else ref="scrollEl" class="flex-1 overflow-y-auto flex flex-col gap-3 p-4">
    <div
      v-for="msg in messages"
      :key="msg.uuid"
      class="flex items-end gap-2"
      :class="isMine(msg) ? 'flex-row-reverse' : 'flex-row'"
    >
      <BaseUserAvatar
        v-if="!isMine(msg)"
        :user="msg.sender"
        size="size-7"
        class="shrink-0 mb-0.5"
      />

      <div class="flex flex-col max-w-[70%]" :class="isMine(msg) ? 'items-end' : 'items-start'">
        <span v-if="!isMine(msg)" class="text-[11px] text-muted-foreground mb-0.5 px-1">
          {{ msg.sender.first_name }} {{ msg.sender.last_name }}
        </span>

        <div
          class="px-3 py-2 rounded-2xl text-sm"
          :class="
            isMine(msg)
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          "
        >
          <p class="break-words">{{ msg.message }}</p>
          <p
            class="text-[10px] mt-1"
            :class="isMine(msg) ? 'text-primary-foreground/70' : 'text-muted-foreground'"
          >
            {{ formatDateToString(msg.created_at, 'HH:mm') }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="border-t border-border bg-card p-3 flex gap-2 shrink-0">
    <Input
      v-model="newMessage"
      type="text"
      placeholder="Wpisz wiadomość..."
      class="text-sm h-9"
      @keydown="handleKeyDown"
    />
    <Button
      type="button"
      size="sm"
      class="px-3 shrink-0"
      :disabled="!newMessage.trim()"
      @click="handleSend"
    >
      <SendIcon class="size-3.5" />
    </Button>
  </div>
</template>
