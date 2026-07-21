<script setup lang="ts">
import { ChevronLeftIcon, MessageCircleIcon, Minimize2Icon, SendIcon, XIcon } from 'lucide-vue-next'
import { useAPI } from '~/composables/useAPI'
import { MessageGroupsEndpoints, messageGroupsKey } from '~/features/messages'
import { UsersEndpoints, usersKey } from '~/features/users'
import type { MessageGroupType, User } from '~/types'

const { user: currentUser } = useAuth()

const { data: groups } = useAPI<MessageGroupType[]>(MessageGroupsEndpoints.BASE, {
  key: messageGroupsKey,
  server: false,
  default: () => [],
})

const { data: users } = useAPI<User[]>(UsersEndpoints.BASE, {
  key: usersKey,
  server: false,
  default: () => [],
})
</script>

<template>
  <Teleport to="body">
    <!-- Floating trigger button -->
    <button
      type="button"
      class="fixed bottom-4 left-4 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="Wiadomości"
      @click="isOpen = !isOpen"
    >
      <MessageCircleIcon class="size-5" />
    </button>
  </Teleport>
</template>
