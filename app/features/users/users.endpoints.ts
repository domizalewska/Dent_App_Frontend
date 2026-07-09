export const UsersEndpoints = (uuid?: string) => ({
  LIST_SELECT: '/user/selectlist',
  LIST: `/user`,
  USER_EDIT_PASSWORD: '/user/edit-password',
  USER_DETAILS: `/user/${uuid}`,
  EXPORT: '/user/export',
  AVATAR: `/user/${uuid}/avatar`,
  BACKGROUND: `/user/${uuid}/background`,
  FILE_LIST: `/user/${uuid}/file`,
  FILE_UPLOAD: `/user/${uuid}/file`,
  FILE_ITEM: (fileUuid: string) => `/user/${uuid}/file/${fileUuid}`,
  FILE_DOWNLOAD: (fileUuid: string) => `/user/${uuid}/file-download/${fileUuid}`,
  FILE_NEW_VERSION: (fileUuid: string) => `/user/${uuid}/file-new-version/${fileUuid}`,
})
