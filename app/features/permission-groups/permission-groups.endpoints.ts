export const PermissionGroupsEndpoints = {
  BASE: '/permission-group',
  PERMISSIONS: '/permission',
  DETAILS: (uuid: string) => `/permission-group/${uuid}`,
  ASSIGN_PERMISSIONS: (uuid: string) => `/permission-group/${uuid}/permissions`,
}
