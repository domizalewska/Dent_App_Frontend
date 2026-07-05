export const UsersEndpoints = {
  BASE: '/user',
  LIST_SELECT: '/user/selectlist',
  USER_EDIT_PASSWORD: '/user/edit-password',
  EXPORT: '/user/export',
  DETAILS: (uuid: string) => `/user/${uuid}`,
  AVATAR: (uuid: string) => `/user/${uuid}/avatar`,
  BACKGROUND: (uuid: string) => `/user/${uuid}/background`,
  FILE_UPLOAD: (uuid: string) => `/user/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string, fileUuid: string) => `/user/${uuid}/file-download/${fileUuid}`,
}
