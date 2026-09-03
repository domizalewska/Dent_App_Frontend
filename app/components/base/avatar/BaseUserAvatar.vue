<script setup lang="ts">
import type { Patient, User } from '~/types'

interface Props {
  user?: User
  patient?: Patient
  size?: string
  showName?: boolean
  showStatus?: boolean
}

const props = defineProps<Props>()

const { assetsUrl } = useRuntimeConfig().public

function resolveUrl(path: string) {
  return path.startsWith('http') ? path : `${assetsUrl}/${path}`
}
</script>

<template>
  <div :class="['relative inline-flex rounded-full', props.size ?? 'size-9']" v-bind="$attrs">
    <div class="w-full h-full rounded-full overflow-hidden bg-muted flex items-center justify-center">
      <template v-if="user">
        <img
          v-if="user.avatar_path"
          :src="resolveUrl(user.avatar_path)"
          alt="User avatar"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-xs font-medium text-muted-foreground">
          {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
        </span>
      </template>
      <template v-else-if="patient">
        <span class="text-xs font-medium text-muted-foreground">
          {{ patient.first_name?.[0] }}{{ patient.last_name?.[0] }}
        </span>
      </template>
    </div>
    <BaseUserStatusBadge
      v-if="showStatus && user"
      :user="user"
      class="absolute bottom-0 right-0"
    />
  </div>
  <span v-if="showName && user" class="ml-2 text-sm font-medium truncate">
    {{ user.first_name }} {{ user.last_name }}
  </span>
  <span v-else-if="showName && patient" class="ml-2 text-sm font-medium truncate">
    {{ patient.first_name }} {{ patient.last_name }}
  </span>
</template>
