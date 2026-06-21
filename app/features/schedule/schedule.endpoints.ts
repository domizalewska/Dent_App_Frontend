export const ScheduleEndpoints = (uuid?: string) => ({
  EVENTS: '/calendar',
  EVENT_DETAILS: `/calendar/${uuid}`,
})
