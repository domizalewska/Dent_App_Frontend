export const AppointmentsEndpoints = {
  BASE: '/appointment',
  TODAY: '/appointment/today',
  EXPORT: '/appointment/export',
  DETAILS: (uuid: string) => `/appointment/${uuid}`,
  BY_DOCTORS: '/appointment/by-doctors',
}
