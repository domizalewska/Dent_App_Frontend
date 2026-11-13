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
  requiredPermissions?: string[]
  somePermissions?: string[]
}

interface Props {
  items: NavItem[]
}

const props = defineProps<Props>()

const route = useRoute()
const { user } = useAuth()

const visibleItems = computed(() =>
  props.items.filter((item) => {
    if (!item.requiredPermissions?.length && !item.somePermissions?.length) return true
    if (!user.value) return false
    if (user.value.is_superuser) return true
    const authRoutes = user.value.auth_route ?? []
    if (item.requiredPermissions?.length) {
      return item.requiredPermissions.every((p) => authRoutes.includes(p))
    }
    if (item.somePermissions?.length) {
      return item.somePermissions.some((p) => authRoutes.includes(p))
    }
    return true
  }),
)
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>MENU</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in visibleItems" :key="item.title">
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
