<script setup lang="ts">
import MessagePrivateItem from '~/components/messages/notification/MessagePrivateItem.vue'
import MessageGroupItem from '~/components/messages/notification/MessageGroupItem.vue'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

const props = defineProps<Props>()
const emit = defineEmits<{ select: [group: MessageGroupType] }>()

const { user: currentUser } = useAuth()

function isPrivate(group: MessageGroupType) {
  return group.users.length <= 2
}

function getOtherUser(group: MessageGroupType) {
  return group.users.find((u) => u.uuid !== currentUser.value?.uuid) ?? group.users[0]
}
</script>

<template>
  <div class="bg-background">
    <MessagePrivateItem
      v-if="isPrivate(props.group)"
      :user="getOtherUser(props.group)"
      :unread-count="props.group.unread_count"
      :last-message="props.group.last_message"
      @select="emit('select', props.group)"
    />
    <MessageGroupItem v-else :group="props.group" @select="emit('select', $event)" />
  </div>
</template>
