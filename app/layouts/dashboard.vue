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
          <header class="flex h-16 flex-col w-full gap-2 px-4">
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
            <div class="flex flex-col w-full">
              <HeaderPage :title="header" />
              <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                <slot />
              </div>
            </div>
          </header>
        </SidebarInset>
      </SidebarProvider>
    </div>
  </div>
</template>
