<script setup lang="ts">
import SidebarComponent from '~/components/main/SidebarComponent.vue';
import { Sun, Moon } from 'lucide-vue-next';
import { ref } from 'vue';

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#"> Widok główny </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="bg-muted/50 aspect-video rounded-xl" />
            <div class="bg-muted/50 aspect-video rounded-xl" />
            <div class="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
