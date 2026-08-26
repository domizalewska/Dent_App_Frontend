<script setup lang="ts">
import MessageNotificationItems from '~/components/messages/notification/MessageNotificationItems.vue'
import MessageUserItem from '~/components/messages/notification/MessageUserItem.vue'
import type { MessageGroupType, User } from '~/types'
import { UsersEndpoints } from '~/features/users'

const emit = defineEmits<{
  select: [group: MessageGroupType]
  'select-user': [user: User]
}>()

const { groups, fetchGroups } = useMessageGroups()
const { data } = useAPI<{ data: User[] }>(UsersEndpoints.LIST_SELECT)

const search = ref('')

const filteredUsers = computed(() => {
  const s = search.value.toLowerCase()
  return (data.value?.data ?? []).filter((u) =>
    `${u.first_name} ${u.last_name}`.toLowerCase().includes(s),
  )
})

onMounted(() => fetchGroups())
</script>

<template>
  <div class="flex justify-between items-center p-4 border-b border-border">
    <span class="font-semibold text-sm bg-card">Wiadomości</span>
  </div>
  <div class="px-4 py-3 border-b border-border bg-background">
    <Input v-model="search" placeholder="Szukaj użytkownika..." class="h-9 text-sm" />
  </div>
  <ScrollArea class="h-[360px] bg-background rounded-b-lg">
    <template v-if="search">
      <MessageUserItem
        v-for="user in filteredUsers"
        :key="user.uuid"
        :user="user"
        @select="emit('select-user', $event)"
      />
    </template>
    <template v-else>
      <MessageNotificationItems
        v-for="group in groups"
        :key="group.uuid"
        :group="group"
        @select="emit('select', $event)"
      />
    </template>
  </ScrollArea>
</template>
