export interface NotificationModel {
  uuid: string
  type: string
  title: string
  message?: string
  read: boolean
  created_at: string
  url?: string
}

export interface NotificationsResponse {
  notifications: NotificationModel[]
  unread_count: number
  pagination: Record<string, unknown>
}

export interface NotificationSettings {
  preferences: NotificationPreference[]
}

export interface NotificationPreference {
  group_id: string
  group_name: string
  group_description: string
  notification_types: NotificationType[]
}

export interface NotificationType {
  type_id: string
  type_name: string
  type_description: string
  channels: NotificationChannel[]
}

export interface NotificationChannel {
  channel_id: string
  channel_name: string
  channel_display_name: string
  enabled: boolean
}
