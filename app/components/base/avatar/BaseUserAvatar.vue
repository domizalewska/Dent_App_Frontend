<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
  size?: string
  showName?: boolean
  showStatus?: boolean
}

defineOptions({ inheritAttrs: false })

const props = defineProps<Props>()

const initials = computed(() =>
  `${props.user.first_name[0]}${props.user.last_name[0]}`.toUpperCase(),
)
</script>

<template>
  <div class="relative inline-flex rounded-full" v-bind="$attrs">
    <Avatar :class="[props.size ?? 'size-9']">
      <AvatarImage v-if="props.user.avatar_path || props.user.profile_picture" :src="props.user.avatar_path ?? props.user.profile_picture" />
      <AvatarFallback class="text-xs">{{ initials }}</AvatarFallback>
    </Avatar>
    <BaseUserStatusBadge
      v-if="showStatus && user.status"
      :status="user.status"
      class="absolute bottom-0 right-0"
    />
  </div>
  <span v-if="showName" class="text-sm font-medium truncate">
    {{ user.first_name }} {{ user.last_name }}
  </span>
</template>
