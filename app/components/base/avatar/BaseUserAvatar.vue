<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
  size?: string
}

const props = defineProps<Props>()

const initials = computed(() =>
  `${props.user.first_name?.[0] ?? ''}${props.user.last_name?.[0] ?? ''}`.toUpperCase(),
)
</script>

<template>
  <Avatar :class="props.size ?? 'size-9'">
    <AvatarImage v-if="props.user.profile_picture" :src="props.user.profile_picture" />
    <AvatarFallback class="text-xs">{{ initials }}</AvatarFallback>
  </Avatar>
</template>
