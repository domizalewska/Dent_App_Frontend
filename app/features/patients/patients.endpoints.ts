export const PatientsEndpoints = (uuid?: string) => ({
  LIST: '/patient/selectlist',
  TABLE: '/patient',
  EXPORT: '/patient/export',
  PATIENT_DETAILS: `/patient/${uuid}`,
})
