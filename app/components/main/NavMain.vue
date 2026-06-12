<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { LucideIcon } from 'lucide-vue-next'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
}

interface Props {
  items: NavItem[]
}

defineProps<Props>()

const route = useRoute()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>MENU</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          :tooltip="item.title"
          :is-active="route.path === item.url"
          @click="navigateTo(item.url)"
        >
          <component :is="item.icon" v-if="item.icon" />
          <span>{{ item.title }}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>
