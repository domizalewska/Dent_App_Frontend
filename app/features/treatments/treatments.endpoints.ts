export const TreatmentsEndpoints = {
  BASE: '/dental-examination',
  LIST_SELECT: '/dental-examination/selectlist',
  DETAILS: (uuid: string) => `/dental-examination/${uuid}`,
  EXPORT: '/dental-examination/export',
}
