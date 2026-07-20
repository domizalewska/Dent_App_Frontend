<script setup lang="ts">
import type { MessageType } from '~/types'
import { formatDateToString } from '~/utils/formatDate'

interface Props {
  message: MessageType
  isSent: boolean
}

const props = defineProps<Props>()

const time = computed(() => formatDateToString(props.message.created_at, 'HH:mm'))
</script>

<template>
  <div class="flex" :class="isSent ? 'justify-end' : 'justify-start'">
    <div class="flex flex-col gap-0.5 max-w-[75%]" :class="isSent ? 'items-end' : 'items-start'">
      <div
        class="rounded-lg px-3 py-2 text-sm"
        :class="
          isSent
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground border border-border'
        "
      >
        {{ message.message }}
      </div>
      <span class="text-[10px] text-muted-foreground px-1">{{ time }}</span>
    </div>
  </div>
</template>
