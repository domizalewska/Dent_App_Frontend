<script setup lang="ts">
import MessagePrivateItem from '~/components/messages/notification/MessagePrivateItem.vue'
import MessageGroupItem from '~/components/messages/notification/MessageGroupItem.vue'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

defineProps<Props>()
const emit = defineEmits<{ select: [group: MessageGroupType] }>()
</script>

<template>
  <component
    :is="group.users.length <= 2 ? MessagePrivateItem : MessageGroupItem"
    :group="group"
    @select="emit('select', $event)"
  />
</template>
