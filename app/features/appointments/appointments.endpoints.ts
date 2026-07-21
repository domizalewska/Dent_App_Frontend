export const AppointmentsEndpoints = {
  BASE: '/appointment',
  TODAY: '/appointment/today',
  BY_DOCTORS: '/appointment/by-doctors',
  EXPORT: '/appointment/export',
  DETAILS: (uuid: string) => `/appointment/${uuid}`,
  BY_DOCTORS: '/appointment/by-doctors',
}
