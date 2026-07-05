export const TreatmentsEndpoints = {
  BASE: '/api/treatment',
  LIST_SELECT: '/api/treatment/selectlist',
  DETAILS: (uuid: string) => `/api/treatment/${uuid}`,
  EXPORT: '/api/treatment/export',
}
