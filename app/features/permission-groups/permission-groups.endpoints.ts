export const PermissionGroupsEndpoints = {
  BASE: '/permission-group',
  SELECT_LIST: '/permission-group/selectlist',
  PERMISSIONS: '/permission',
  DETAILS: (uuid: string) => `/permission-group/${uuid}`,
  ASSIGN_PERMISSIONS: (uuid: string) => `/permission-group/${uuid}/permissions`,
  ASSIGN_USERS: (uuid: string) => `/permission-group/${uuid}/users`,
}
