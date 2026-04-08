export const JobPositionsEndpoints = (uuid?: string) => ({
  LIST: '/job-position/selectlist',
  TABLE: '/job-position',
  JOB_POSITION_DETAIL: `/job-position/${uuid}`,
})
