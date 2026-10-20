export const PatientsEndpoints = {
  BASE: '/patient',
  LIST_SELECT: '/patient/selectlist',
  EXPORT: '/patient/export',
  DETAILS: (uuid: string) => `/patient/${uuid}`,
  APPOINTMENTS: (uuid: string) => `/patient/${uuid}/appointments`,
  FILE_UPLOADS: (uuid: string) => `/patient/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string, fileUuid: string) => `/patient/${uuid}/file-download/${fileUuid}`,
  FILE_DELETE: (uuid: string, fileUuid: string) => `/patient/${uuid}/file/${fileUuid}`,
  PHOTO_LIST: (uuid: string) => `/patient/${uuid}/photo`,
  PHOTO_STORE: (uuid: string) => `/patient/${uuid}/photo`,
  PHOTO_DOWNLOAD: (uuid: string, photoUuid: string) => `/patient/${uuid}/photo-download/${photoUuid}`,
  PHOTO_DETAILS: (uuid: string, photoUuid: string) => `/patient/${uuid}/photo/${photoUuid}`,
}
