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
  <div class="h-screen w-full flex overflow-hidden">
    <SidebarProvider :style="{ '--sidebar-width': '19rem' }">
      <SidebarComponent />
      <SidebarInset class="flex flex-col min-h-0 flex-1">
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <div class="flex mt-2 w-full items-center justify-between">
            <div class="flex items-center justify-center">
              <SidebarTrigger class="-ml-1" />
              <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
              <BaseBreadcrumb
                v-for="(item, index) in breadcrumbs"
                :key="index"
                :name="item.name"
                :link="item.link"
              />
            </div>
            <HeaderComponent />
          </div>
        </header>
        <div class="flex flex-col flex-1 min-h-0 px-4 pb-4">
          <HeaderPage :title="header" />
          <div class="flex flex-1 flex-col min-h-0 gap-4 pt-0">
            <slot />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
