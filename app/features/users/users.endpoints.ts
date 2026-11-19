export const UsersEndpoints = {
  BASE: '/user',
  LIST_SELECT: '/user/selectlist',
  DENTIST_LIST_SELECT: '/dentist/selectlist',
  USER_EDIT_PASSWORD: '/user/edit-password',
  EXPORT: '/user/export',
  DETAILS: (uuid: string) => `/user/${uuid}`,
  AVATAR: (uuid: string) => `/user/${uuid}/avatar`,
  BACKGROUND: (uuid: string) => `/user/${uuid}/background`,
  FILE_UPLOAD: (uuid: string) => `/user/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string, fileUuid: string) => `/user/${uuid}/file-download/${fileUuid}`,
  FILE_BACKGROUND_DOWNLOAD: (uuid: string, fileUuid: string) =>
    `/user/${uuid}/file-background-download/${fileUuid}`,
  FILE_NEW_VERSION: (uuid: string, fileUuid: string) =>
    `/user/${uuid}/file-new-version/${fileUuid}`,
  FILE_DELETE: (uuid: string, fileUuid: string) => `/user/${uuid}/file/${fileUuid}`,
  ASSIGN_JOB_POSITION: (uuid: string) => `/user/${uuid}/jobposition`,
}
