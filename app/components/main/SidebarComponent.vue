<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';

import { BookUser, CalendarDays, GalleryVerticalEnd, Settings2, Users } from 'lucide-vue-next';
import NavMain from './NavMain.vue';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
});

const data = {
  navMain: [
    {
      title: 'Użytkownicy',
      url: '#',
      icon: Users,
      isActive: true,
      items: [
        {
          title: 'Lista',
          url: '#',
        },
      ],
    },
    {
      title: 'Harmonogram',
      url: '#',
      icon: CalendarDays,
      items: [
        {
          title: 'Kalendarz',
          url: '#',
        },
      ],
    },
    {
      title: 'Urlopy',
      url: '#',
      icon: BookUser,
      items: [
        {
          title: 'Widok urlopów',
          url: '#',
        },
      ],
    },
    {
      title: 'Ustawienia',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Ogólne',
          url: '#',
        },
        {
          title: 'Powiadomienia',
          url: '#',
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <a href="#">
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <GalleryVerticalEnd class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Dent APP</span>
                <span class="">v1.0.0</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu></SidebarHeader
    >
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
