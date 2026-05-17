export const PatientsEndpoints = (uuid?: string) => ({
  LIST: '/patient/selectlist',
  TABLE: '/patient',
  EXPORT: '/patient/export',
  PATIENT_DETAILS: `/patient/${uuid}`,
  APPOINTMENTS: `/patient/${uuid}/appointments`,
  FILE_UPLOADS: `/patient/${uuid}/file`,
  FILE_DOWNLOAD: (fileUuid: string) => `/patient/${uuid}/file-download/${fileUuid}`,
})
