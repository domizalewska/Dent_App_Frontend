export const UsersEndpoints = (uuid?: string) => ({
  LIST_SELECT: '/user/selectlist',
  LIST: `/user`,
  USER_EDIT_PASSWORD: '/user/edit-password',
  USER_DETAILS: `/user/${uuid}`,
  EXPORT: '/user/export',
  AVATAR: `/user/${uuid}/avatar`,
  BACKGROUND: `/user/${uuid}/background`,
  FILE_UPLOAD: `/user/${uuid}/file`,
  FILE_DOWNLOAD: (fileUuid: string) => `/user/${uuid}/file-download/${fileUuid}`,
})
