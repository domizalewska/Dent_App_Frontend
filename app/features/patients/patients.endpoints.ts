export const PatientsEndpoints = {
  BASE: '/patient',
  LIST_SELECT: '/patient/selectlist',
  EXPORT: '/patient/export',
  DETAILS: (uuid: string) => `/patient/${uuid}`,
  APPOINTMENTS: (uuid: string) => `/patient/${uuid}/appointments`,
  FILE_UPLOADS: (uuid: string) => `/patient/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string) => (fileUuid: string) => `/patient/${uuid}/file-download/${fileUuid}`,
}
