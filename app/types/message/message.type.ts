import type { User } from '~/types'

export type MessageType = {
  uuid: string
  message_group_uuid?: string
  message: string
  created_at: string
  sender: User
  recipient: User
}

export type MessageGroupType = {
  uuid: string
  name: string
  created_at: string
  is_default: boolean
  creator_uuid?: string
  creator?: User
  users: User[]
  last_message?: MessageType
  unread_count?: number
}

export type MessageGroupPayload = {
  name: string
  user_uuids?: string[]
}
