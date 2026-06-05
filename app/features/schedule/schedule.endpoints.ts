export const ScheduleEndpoints = (uuid?: string) => ({
  TABLE: '/event',
  EVENT_DETAIL: `/event/${uuid}`,
})
