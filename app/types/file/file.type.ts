import type { User } from '~/types'

export type FileItem = {
  uuid: string
  filename: string
  extension: string
  file_uuid: string | null
  fileable_id: string
  fileable_type: string
  files: FileItem[]
  size: string
  created_at: string
  updated_at: string
  mimetype: string
  is_latest: boolean
  path: string
  user: User
  user_uuid: string
}
