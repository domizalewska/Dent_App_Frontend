export const StatisticsEndpoints = {
  USERS: '/statistics/users',
  USER_SUMMARY: (uuid: string) => `/statistics/users/${uuid}/summary`,
  USER_DISTRIBUTION: (uuid: string) => `/statistics/users/${uuid}/distribution`,
  USER_DAILY: (uuid: string) => `/statistics/users/${uuid}/daily`,
}
