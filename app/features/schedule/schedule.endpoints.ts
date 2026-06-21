export const ScheduleEndpoints = (uuid?: string) => ({
  EVENTS: '/calendar',
  SELECT: '/calendar/selectlist',
  EXPORT: '/calendar/export',
  EVENT_DETAILS: `/calendar/${uuid}`,
  ASSIGN_PARTICIPANTS: `/calendar/${uuid}/users`,
  HISTORY: `/calendar/${uuid}/history`,
  HISTORY_EXPORT: `/calendar/${uuid}/history/export`,
})
