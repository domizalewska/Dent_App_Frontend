<script setup lang="ts">
import SidebarComponent from '~/components/main/SidebarComponent.vue'
import { header } from '~/composables/useHeader'
import { breadcrumbs } from '~/composables/useBreadcrumbs'
import { useAPI } from '~/composables/useAPI'
import type { User } from '~/types'

const { user } = useAuth()

const { data } = useAPI<User>('/user/user-info', { server: false })

watch(
  data,
  (val) => {
    if (val) user.value = val
  },
  { immediate: true },
)
</script>

<template>
  <div class="h-screen w-full flex">
    <div class="flex shrink-0 w-full">
      <SidebarProvider :style="{ '--sidebar-width': '19rem' }">
        <SidebarComponent />
        <SidebarInset>
          <header class="flex h-16 shrink-0 w-full items-center justify-between px-4 bg-sidebar">
            <div class="flex items-center gap-2">
              <SidebarTrigger class="-ml-1" />
              <Separator orientation="vertical" class="data-[orientation=vertical]:h-4" />
              <BaseBreadcrumb
                v-for="(item, index) in breadcrumbs"
                :key="index"
                :name="item.name"
                :link="item.link"
              />
            </div>
            <HeaderComponent />
          </header>
          <Separator />
          <div class="flex flex-col w-full p-4">
            <HeaderPage :title="header" />
            <div class="flex flex-1 flex-col gap-4">
              <slot />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </div>
</template>
