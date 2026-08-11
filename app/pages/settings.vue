<script setup lang="ts">
import { BellIcon } from 'lucide-vue-next'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Ustawienia', link: '/settings' }])
resetHeader()
setHeader('Ustawienia')

const tabs = [{ label: 'Powiadomienia', to: '/settings/notifications', icon: BellIcon }]

const route = useRoute()

function isActive(to: string) {
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <div class="flex gap-1 border-b border-border pb-0">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px"
        :class="
          isActive(tab.to)
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        "
      >
        <component :is="tab.icon" class="size-4" />
        {{ tab.label }}
      </NuxtLink>
    </div>

    <NuxtPage />
  </div>
</template>
