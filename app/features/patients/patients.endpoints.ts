export const PatientsEndpoints = (uuid?: string) => ({
  TABLE: '/patient',
  SELECT: '/patient/selectlist',
  EXPORT: '/patient/export',
  DETAIL: `/patient/${uuid}`,
  HISTORY: `/patient/${uuid}/history`,
  HISTORY_EXPORT: `/patient/${uuid}/history/export`,
  APPOINTMENTS: `/patient/${uuid}/appointments`,
  FILE_UPLOAD: `/patient/${uuid}/file`,
  FILE_DETAIL: (fileUuid: string) => `/patient/${uuid}/file/${fileUuid}`,
  FILE_DOWNLOAD: (fileUuid: string) => `/patient/${uuid}/file-download/${fileUuid}`,
  FILE_NEW_VERSION: (fileUuid: string) => `/patient/${uuid}/file-new-version/${fileUuid}`,
})
