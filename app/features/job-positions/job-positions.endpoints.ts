export const JobPositionsEndpoints = (uuid?: string) => ({
  LIST: '/job-positions/selectlist',
  TABLE: '/job-positions',
  JOB_POSITION_DETAIL: `/job-positions/${uuid}`,
})
