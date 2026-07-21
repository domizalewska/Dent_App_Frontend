import { toast } from 'vue-sonner'
import type { NotificationModel } from '~/types'
import { NotificationsEndpoints } from '~/features/notifications'
import { toastErrorStyle } from '~/utils/toast'

const notifications = ref<NotificationModel[]>([])
const unreadCount = ref(0)
const isLoading = ref(false)

export function useNotificationStore() {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function fetch() {
    try {
      isLoading.value = true
      const response = await api<{ notifications: NotificationModel[]; unread_count: number }>(
        NotificationsEndpoints.BASE,
      )
      unreadCount.value = response.unread_count
      notifications.value = response.notifications
    } catch {
      toast.error('Błąd pobierania powiadomień', { style: toastErrorStyle })
    } finally {
      isLoading.value = false
    }
  }

  async function markAsRead(notificationUuid?: string) {
    await api(NotificationsEndpoints.MARK_AS_READ, {
      method: 'POST',
      body: { notification_id: notificationUuid },
    })
    await fetch()
  }

  return reactive({
    fetch,
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
  })
}
