import type { User } from '~/types/user'
import {
  AnnouncementsPermissions,
  CalendarPermissions,
  JobPositionsPermissions,
  PatientsPermissions,
  PermissionGroupPermissions,
  SchedulePermissions,
  StatisticsPermissions,
  TreatmentsPermissions,
  UsersPermissions,
} from './modules'

export const Permissions = {
  announcements: AnnouncementsPermissions,
  calendar: CalendarPermissions,
  jobPositions: JobPositionsPermissions,
  patients: PatientsPermissions,
  permissionGroup: PermissionGroupPermissions,
  schedule: SchedulePermissions,
  statistics: StatisticsPermissions,
  treatments: TreatmentsPermissions,
  users: UsersPermissions,
}

export type PermissionType = {
  uuid: string
  resource: string
  type: string
  created_at: string
  updated_at: string
}

export type PermissionGroupType = {
  uuid: string
  name: string
  description: string | null
  permissions: PermissionType[]
  users?: User[]
}

export type PermissionGroupPayload = {
  name: string
  description?: string | null
}
