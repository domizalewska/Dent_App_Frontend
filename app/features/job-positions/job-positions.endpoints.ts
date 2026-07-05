export const JobPositionsEndpoints = {
  BASE: '/job-position',
  LIST_SELECT: '/job-position/selectlist',
  EXPORT: '/job-position/export',
  DETAILS: (uuid: string) => `/job-position/${uuid}`,
}
