<script setup lang="ts">
import { MessageCircleIcon } from 'lucide-vue-next'
import type { MessageGroupType } from '~/types'

const { selectedGroup, selectGroup, clearGroup } = useMessages()
const popoverOpen = ref(false)

async function handleSelect(group: MessageGroupType) {
  await selectGroup(group)
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
    <PopoverContent class="p-0 w-[400px]" align="end">
      <MessageNotificationCard @select="handleSelect" />
    </PopoverContent>
  </Popover>

  <MessageChat v-if="selectedGroup" :group="selectedGroup" @close="clearGroup" />
</template>
