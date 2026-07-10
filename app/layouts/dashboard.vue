<script setup lang="ts">
import SidebarComponent from '~/components/main/SidebarComponent.vue'
import { header } from '~/composables/useHeader'
import { breadcrumbs } from '~/composables/useBreadcrumbs'
import { useAPI } from '~/composables/useAPI'
import type { User } from '~/types'
import { userInfoKey } from '~/features/users'

const { user } = useAuth()

const { data } = useAPI<User>('/user/user-info', { key: userInfoKey, server: false })

watch(
  data,
  (val) => {
    if (val) user.value = val
  },
  { immediate: true },
)
</script>

<template>
  <SidebarProvider :style="{ '--sidebar-width': '19rem' }">
    <SidebarComponent />
    <SidebarInset>
      <header class="flex h-16 shrink-0 w-full items-center justify-between px-4 bg-sidebar">
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
          <BaseBreadcrumb :items="breadcrumbs" />
        </div>
        <HeaderComponent />
      </header>
      <Separator />
      <div class="flex flex-col flex-1 overflow-y-auto p-4">
        <HeaderPage :title="header" />
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
