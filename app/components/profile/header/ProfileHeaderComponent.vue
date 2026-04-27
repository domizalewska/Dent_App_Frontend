<script setup lang="ts">
import { BadgeCheck, Calendar, Mail, Phone } from 'lucide-vue-next'
import type { User } from '~/types'

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
    <Avatar class="-mt-12 size-24 border-4 border-card shadow-lg sm:-mt-16 sm:size-32">
      <AvatarImage
        v-if="user.profile_picture"
        :src="user.profile_picture"
        :alt="`${user.first_name} ${user.last_name}`"
      />
      <AvatarFallback v-else class="text-2xl">
        {{ user.first_name?.[0] }}{{ user.last_name?.[0] }}
      </AvatarFallback>
    </Avatar>

    <div class="flex-1 space-y-2 pb-2">
      <h1 class="text-2xl font-bold">{{ user.first_name }} {{ user.last_name }}</h1>

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
