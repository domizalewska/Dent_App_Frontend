import type { User } from '~/types'

export type MessageType = {
  uuid: string
  user_uuid: string
  recipient_user_uuid: string
  message_group_uuid: string
  message: string
  created_at: string
  user?: User
}

export type MessageGroupType = {
  uuid: string
  name: string
  created_at: string
  users?: User[]
}

export type MessageGroupPayload = {
  name: string
  user_uuids?: string[]
}
