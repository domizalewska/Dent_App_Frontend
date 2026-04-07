export const JobPositionsEndpoints = (uuid?: string) => ({
  LIST: '/job-position/selectlist',
  JOB_POSITION_DETAIL: `/job-position/${uuid}`,
})
