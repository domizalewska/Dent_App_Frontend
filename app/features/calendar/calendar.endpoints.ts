export const CalendarEndpoints = {
  BASE: '/calendar',
  TODAY: '/calendar/today',
  EXPORT: '/calendar/export',
  DETAILS: (uuid: string) => `/calendar/${uuid}`,
}
