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
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  ChartColumnBig,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Settings2,
  ShieldCheck,
  Stethoscope,
  UserRoundSearch,
  Users,
} from 'lucide-vue-next'
import NavMain from './NavMain.vue'
import { Permissions } from '~/types'

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
      title: 'Ogłoszenia',
      url: '/announcements',
      icon: Megaphone,
      somePermissions: [Permissions.announcements.INDEX],
    },
    {
      title: 'Pracownicy',
      url: '/users',
      icon: Users,
      somePermissions: [Permissions.users.INDEX],
    },
    {
      title: 'Pacjenci',
      url: '/patients',
      icon: UserRoundSearch,
      somePermissions: [Permissions.patients.INDEX],
    },
    {
      title: 'Grafik pracowników',
      url: '/schedule',
      icon: CalendarCheck,
      somePermissions: [Permissions.schedule.INDEX],
    },
    // {
    //   title: 'Grafik wizyt',
    //   url: '/schedule-room',
    //   icon: CalendarDays,
    //   somePermissions: [Permissions.calendar.INDEX],
    // },
    {
      title: 'Grafik lekarzy',
      url: '/schedule-doctors',
      icon: CalendarClock,
      somePermissions: [Permissions.calendar.INDEX],
    },
    {
      title: 'Stanowiska',
      url: '/job-positions',
      icon: Briefcase,
      somePermissions: [Permissions.jobPositions.INDEX],
    },
    {
      title: 'Statystyki',
      url: '/statistics',
      icon: ChartColumnBig,
      somePermissions: [Permissions.statistics.INDEX],
    },
    {
      title: 'Usługi',
      url: '/treatments',
      icon: ClipboardList,
      somePermissions: [Permissions.treatments.INDEX],
    },
    {
      title: 'Grupy uprawnień',
      url: '/permission-groups',
      icon: ShieldCheck,
      somePermissions: [Permissions.permissionGroup.INDEX],
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
          <SidebarMenuButton :tooltip="'Ustawienia'" @click="navigateTo('/settings/notifications')">
            <Settings2 />
            <span>Ustawienia</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
