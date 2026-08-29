<script setup lang="ts">
import type { User } from '~/types'

interface Props {
  user: User
  size?: string
  showName?: boolean
  showStatus?: boolean
}

const props = defineProps<Props>()

const { assetsUrl } = useRuntimeConfig().public
</script>

<template>
  <div class="relative inline-flex rounded-full" v-bind="$attrs">
    <div :class="['rounded-full overflow-hidden bg-muted flex items-center justify-center', props.size ?? 'size-9']">
      <img
        v-if="user.avatar_path"
        :src="`${assetsUrl}${user.avatar_path}`"
        alt="User avatar"
        class="w-full h-full object-cover"
      />
      <span v-else class="text-xs font-medium text-muted-foreground">
        {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
      </span>
    </div>
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
