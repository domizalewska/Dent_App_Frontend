export const UsersEndpoints = (uuid: string) => ({
  LIST_SELECT: '/user/selectlist',
  LIST: `/user`,
  USER_DETAILS: `/user/${uuid}`,
  EXPORT: '/user/export',
})
