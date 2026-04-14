export const JobPositionsEndpoints = (uuid?: string) => ({
  LIST: '/job-position/selectlist',
  TABLE: '/job-position',
  EXPORT: '/job-position/export',
  JOB_POSITION_DETAIL: `/job-position/${uuid}`,
})
