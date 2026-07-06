<script setup lang="ts">
import { UsersIcon } from 'lucide-vue-next'
import type { User } from '~/types'

defineProps<{
  users: User[]
  loading?: boolean
}>()
</script>

<template>
  <div class="rounded-2xl border border-border bg-card shadow-sm overflow-hidden w-full">
    <div class="flex items-center justify-between px-6 py-5">
      <div class="flex items-center gap-2">
        <UsersIcon class="size-5 text-muted-foreground" />
        <h3 class="text-lg font-semibold text-foreground">Zespół dzisiaj</h3>
      </div>
      <NuxtLink
        to="/users"
        class="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Wszyscy pracownicy
      </NuxtLink>
    </div>

    <div class="border-t border-border" />

    <div v-if="loading" class="px-6 py-8 space-y-3">
      <div v-for="i in 4" :key="i" class="flex items-center gap-3">
        <div class="size-9 rounded-full bg-muted animate-pulse shrink-0" />
        <div class="flex-1 space-y-1.5">
          <div class="h-3.5 w-32 rounded bg-muted animate-pulse" />
          <div class="h-3 w-20 rounded bg-muted animate-pulse" />
        </div>
      </div>
    </div>

    <div
      v-else-if="users.length === 0"
      class="px-6 py-10 text-center text-muted-foreground text-sm"
    >
      Brak pracowników zaplanowanych na dziś.
    </div>

    <div v-else class="divide-y divide-border">
      <div
        v-for="user in users"
        :key="user.uuid"
        class="flex items-center gap-3 px-6 py-4"
      >
        <div class="size-9 rounded-full bg-muted overflow-hidden shrink-0 flex items-center justify-center">
          <img
            v-if="user.profile_picture"
            :src="user.profile_picture"
            :alt="`${user.first_name} ${user.last_name}`"
            class="size-full object-cover"
          />
          <span v-else class="text-sm font-medium text-muted-foreground">
            {{ user.first_name[0] }}{{ user.last_name[0] }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-foreground truncate">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="text-sm text-muted-foreground truncate">
            {{ user.job_position?.name ?? '—' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
