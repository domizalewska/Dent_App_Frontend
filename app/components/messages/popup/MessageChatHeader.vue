<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'
import type { MessageGroupType } from '~/types'

interface Props {
  group: MessageGroupType
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { user: currentUser } = useAuth()
const isPrivate = computed(() => props.group.users.length <= 2)
const otherUser = computed(
  () => props.group.users.find((u) => u.uuid !== currentUser.value?.uuid) ?? props.group.users[0],
)
</script>

<template>
  <div class="flex items-center gap-3 border-b border-border px-4 py-3 bg-card shrink-0">
    <div class="relative shrink-0">
      <template v-if="isPrivate">
        <BaseUserAvatar v-if="otherUser" :user="otherUser" size="size-8" />
      </template>
      <div v-else class="flex items-center">
        <BaseUserAvatar
          v-for="(user, index) in group.users.slice(0, 3)"
          :key="user.uuid"
          :user="user"
          size="size-7"
          :class="index > 0 ? '-ml-2 ring-2 ring-background' : ''"
        />
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold truncate">
        {{ isPrivate ? `${otherUser?.first_name} ${otherUser?.last_name}` : group.name }}
      </p>
      <p class="text-xs text-muted-foreground">
        {{ isPrivate ? otherUser?.job_position?.name : `${group.users.length} uczestników` }}
      </p>
    </div>

    <Button variant="ghost" size="icon" class="shrink-0 size-8" @click="emit('close')">
      <XIcon class="size-4" />
    </Button>
  </div>
</template>
