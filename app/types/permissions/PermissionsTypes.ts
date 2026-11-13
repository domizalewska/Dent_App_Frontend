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
  name: string
  description: string | null
}

export type PermissionGroupType = {
  uuid: string
  name: string
  description: string | null
  permissions: PermissionType[]
}

export type PermissionGroupPayload = {
  name: string
  description?: string | null
}
