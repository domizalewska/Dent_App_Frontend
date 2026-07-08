import type { User } from '~/types'

export type Announcement = {
  uuid: string
  title: string
  content: string
  published_at: string
  author: User
}
