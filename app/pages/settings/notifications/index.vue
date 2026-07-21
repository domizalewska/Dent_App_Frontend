<script setup lang="ts">
import { ChevronDownIcon, WifiOffIcon } from 'lucide-vue-next'
import { useAPI } from '~/composables/useAPI'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import { NotificationsEndpoints, notificationsPreferencesKey } from '~/features/notifications'
import type { NotificationSettings } from '~/types'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
set([{ name: 'Ustawienia powiadomień', link: '/settings/notifications' }])

const { setHeader, resetHeader } = useHeader()
resetHeader()
setHeader('Ustawienia powiadomień')

const { $api } = useNuxtApp()
const api = $api as typeof $fetch

const {
  data: settings,
  status,
  refresh,
} = useAPI<NotificationSettings>(NotificationsEndpoints.PREFERENCES, {
  key: notificationsPreferencesKey,
})

async function onChannelChange(channelId: string, typeId: string, enabled: boolean) {
  try {
    await api(NotificationsEndpoints.PREFERENCES, {
      method: 'PUT',
      body: { preferences: [{ channel_id: channelId, type_id: typeId, enabled }] },
    })
  } catch {
    await refresh()
  }
}
</script>

<template>
  <Card class="h-full">
    <div class="p-6">
      <div v-if="status === 'pending'">
        <NotificationSkeleton />
      </div>

      <div
        v-else-if="status === 'error'"
        class="flex flex-col items-center gap-4 py-12 text-muted-foreground"
      >
        <WifiOffIcon class="size-10" />
        <p class="text-sm">Błąd ładowania ustawień</p>
        <Button variant="outline" size="sm" @click="refresh">Spróbuj ponownie</Button>
      </div>

      <div v-else-if="settings" class="flex flex-col gap-3">
        <Collapsible
          v-for="group in settings.preferences"
          :key="group.group_id"
          class="border border-border rounded-lg overflow-hidden"
        >
          <CollapsibleTrigger class="w-full">
            <div
              class="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div class="text-left">
                <p class="font-semibold text-sm">{{ group.group_name }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ group.group_description }}</p>
              </div>
              <ChevronDownIcon
                class="size-4 text-muted-foreground transition-transform [[data-state=open]_&]:rotate-180"
              />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div class="border-t border-border">
              <div class="flex justify-end gap-6 px-4 py-2 bg-muted/30">
                <span
                  v-for="channel in group.notification_types[0]?.channels"
                  :key="channel.channel_id"
                  class="text-xs font-medium text-muted-foreground w-10 text-center"
                >
                  {{ channel.channel_display_name }}
                </span>
              </div>

              <div
                v-for="notification in group.notification_types"
                :key="notification.type_id"
                class="flex items-center justify-between px-4 py-3 border-t border-border"
              >
                <div>
                  <p class="text-sm font-medium">{{ notification.type_name }}</p>
                  <p class="text-xs text-muted-foreground mt-0.5">
                    {{ notification.type_description }}
                  </p>
                </div>

                <div class="flex gap-6">
                  <div
                    v-for="channel in notification.channels"
                    :key="channel.channel_id"
                    class="flex items-center justify-center w-10"
                  >
                    <Switch
                      :checked="channel.enabled"
                      @update:checked="
                        (val) => onChannelChange(channel.channel_id, notification.type_id, val)
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  </Card>
</template>
