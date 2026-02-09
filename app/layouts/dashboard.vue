<script setup lang="ts">
import SidebarComponent from '~/components/main/SidebarComponent.vue';
import { Sun, Moon } from 'lucide-vue-next';
import { ref } from 'vue';
import { breadcrumbs } from '~/composables/useBreadcrumbs';
import { header } from '~/composables/useHeader';

const isToggle = ref(false);
const colorMode = useColorMode();
function toggleTheme() {
  isToggle.value = !isToggle.value;
  isToggle.value ? (colorMode.value = 'dark') : (colorMode.value = 'light');
}
</script>

<template>
  <div class="flex h-screen">
    <SidebarProvider :style="{ '--sidebar-width': '19rem' }">
      <SidebarComponent />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <div class="pr-4 w-full">
            <BaseBreadcrumb
              v-for="(item, index) in breadcrumbs"
              :key="index"
              :name="item.name"
              :link="item.link"
            />
          </div>
          <div class="flex w-full justify-end flex-1 pr-4">
            <div class="flex gap-2 items-start justify-center cursor-pointer">
              <Button variant="ghost" class="rounded-full" @click="toggleTheme">
                <Sun v-if="isToggle" />
                <Moon v-if="!isToggle" />
              </Button>
              <AvatarComponent class="flex items-start" />
            </div>
          </div>
        </header>
        <div class="flex pl-4 pr-4 w-full">
          <HeaderPage :title="header" />
        </div>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
