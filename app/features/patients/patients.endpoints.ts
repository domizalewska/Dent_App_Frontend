export const PatientsEndpoints = (uuid?: string) => ({
  LIST: '/patient/selectlist',
  TABLE: '/patient',
  EXPORT: '/patient/export',
  ROW_UUID: `/patient${uuid}`,
})
