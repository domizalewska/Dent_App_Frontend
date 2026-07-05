<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  type SidebarProps,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Briefcase,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Settings2,
  Stethoscope,
  UserRoundSearch,
  Users,
} from 'lucide-vue-next'
import NavMain from './NavMain.vue'

const props = defineProps<SidebarProps>()

const { open } = useSidebar()

const data = {
  navMain: [
    {
      title: 'Pulpit',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Pracownicy',
      url: '/users',
      icon: Users,
    },
    {
      title: 'Pacjenci',
      url: '/patients',
      icon: UserRoundSearch,
    },
    {
      title: 'Grafik wizyt',
      url: '/schedule',
      icon: CalendarDays,
    },
    {
      title: 'Stanowiska',
      url: '/job-positions',
      icon: Briefcase,
    },
    {
      title: 'Usługi',
      url: '/treatments',
      icon: ClipboardList,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props" collapsible="icon">
    <SidebarHeader :class="open ? 'border-b' : 'border-b-0'">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <button>
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Stethoscope class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-semibold">DentApp</span>
                <span class="text-muted-foreground text-xs">Klinika Stomatologiczna</span>
              </div>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton :tooltip="'Ustawienia'" @click="navigateTo('/settings')">
            <Settings2 />
            <span>Ustawienia</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
