<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'
import { BadgeCheck, Calendar, Mail, Pencil, Phone, Trash2 } from 'lucide-vue-next'
import type { User } from '~/types'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  avatarUpload: [file: File]
  avatarDelete: []
}>()

const { open, onChange } = useFileDialog({
  accept: 'image/*',
  multiple: false,
})

onChange((files) => {
  if (files?.[0]) {
    emit('avatarUpload', files[0])
  }
})

function handleAvatarAction() {
  if (props.user.profile_picture) {
    emit('avatarDelete')
  }
  else {
    open()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
    <div class="group relative -mt-12 size-24 sm:-mt-16 sm:size-32">
      <Avatar class="size-full border-4 border-card shadow-lg">
        <AvatarImage
          v-if="user.profile_picture"
          :src="user.profile_picture"
          :alt="`${user.first_name} ${user.last_name}`"
        />
        <AvatarFallback v-else class="text-2xl">
          {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
        </AvatarFallback>
      </Avatar>
      <button
        class="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
        @click="handleAvatarAction"
      >
        <Pencil v-if="!user.profile_picture" class="size-6 text-white" />
        <Trash2 v-else class="size-6 text-white" />
      </button>
    </div>

    <div class="flex-1 space-y-2 pb-2">
      <div class="flex items-center justify-between gap-2">
        <h1 class="text-2xl font-bold">{{ user.first_name }} {{ user.last_name }}</h1>
        <Button
          v-if="user.phone_numbers?.length"
          as="a"
          :href="`tel:${user.phone_numbers[0]}`"
          variant="outline"
          size="sm"
          class="shrink-0 gap-1.5 text-xs"
        >
          <Phone class="mr-1 size-3" aria-hidden="true" />
          Zadzwoń
        </Button>
      </div>

      <p v-if="user.job_position" class="text-sm font-medium text-foreground">
        {{ user.job_position.name }}
      </p>
      <p v-else class="text-sm text-muted-foreground">Brak stanowiska</p>

      <div v-if="user.pwz_number" class="flex items-center gap-1.5 text-sm text-muted-foreground">
        <BadgeCheck class="size-3.5" />
        PWZ: {{ user.pwz_number }}
      </div>

      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span class="flex items-center gap-1.5">
          <Mail class="size-3.5" />
          {{ user.email }}
        </span>
        <span v-if="user.phone_numbers?.length" class="flex items-center gap-1.5">
          <Phone class="size-3.5" />
          {{ user.phone_numbers[0] }}
        </span>
        <span class="flex items-center gap-1.5">
          <Calendar class="size-3.5" />
          Z nami od
          {{
            new Date(user.created_at).toLocaleDateString('pl-PL', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>
