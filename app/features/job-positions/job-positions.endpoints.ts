export const JobPositionsEndpoints = {
  BASE: '/job-position',
  LIST_SELECT: '/job-position/selectlist',
  EXPORT: '/job-position/export',
  DETAILS: (uuid: string) => `/job-position/${uuid}`,
  ASSIGN_PERMISSIONS: (uuid: string) => `/job-position/${uuid}/permissions`,
  FILE_LIST: (uuid: string) => `/job-position/${uuid}/file`,
  FILE_UPLOAD: (uuid: string) => `/job-position/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string, fileUuid: string) =>
    `/job-position/${uuid}/file-download/${fileUuid}`,
  FILE_NEW_VERSION: (uuid: string, fileUuid: string) =>
    `/job-position/${uuid}/file-new-version/${fileUuid}`,
  FILE_DETAILS: (uuid: string, fileUuid: string) => `/job-position/${uuid}/file/${fileUuid}`,
  HISTORY: (uuid: string) => `/job-position/${uuid}/history`,
}
