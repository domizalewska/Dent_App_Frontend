<script setup lang="ts">
import { MessageCircleIcon } from 'lucide-vue-next'
import type { MessageGroupType, User } from '~/types'

const { selectedGroup, selectedUser, selectGroup, selectUser, clearGroup } = useMessages()
const popoverOpen = ref(false)

async function handleSelect(group: MessageGroupType) {
  await selectGroup(group)
  popoverOpen.value = false
}

async function handleSelectUser(user: User) {
  await selectUser(user)
  popoverOpen.value = false
}
</script>

<template>
  <Popover v-model:open="popoverOpen">
    <PopoverTrigger as-child>
      <Button variant="ghost" class="rounded-full">
        <MessageCircleIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[400px] shadow-2xl ring-1 ring-white/10" align="end">
      <MessageNotificationCard @select="handleSelect" @select-user="handleSelectUser" />
    </PopoverContent>
  </Popover>

  <MessageChat
    v-if="selectedGroup || selectedUser"
    :group="selectedGroup"
    :user="selectedUser"
    @close="clearGroup"
  />
</template>
