export const JobPositionsEndpoints = (uuid?: string) => ({
  TABLE: '/job-position',
  SELECT: '/job-position/selectlist',
  EXPORT: '/job-position/export',
  DETAIL: `/job-position/${uuid}`,
  HISTORY: `/job-position/${uuid}/history`,
  HISTORY_EXPORT: `/job-position/${uuid}/history/export`,
  FILE_UPLOAD: `/job-position/${uuid}/file`,
  FILE_DETAIL: (fileUuid: string) => `/job-position/${uuid}/file/${fileUuid}`,
  FILE_DOWNLOAD: (fileUuid: string) => `/job-position/${uuid}/file-download/${fileUuid}`,
  FILE_NEW_VERSION: (fileUuid: string) => `/job-position/${uuid}/file-new-version/${fileUuid}`,
})
