export const JobPositionsEndpoints = (uuid?: string) => ({
  LIST: '/job-positions/selectlist',
  JOB_POSITION_DETAIL: `/job-position/${uuid}`,
})
