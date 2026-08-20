export const DentistsEndpoints = {
  BASE: '/dentist',
  LIST_SELECT: '/dentist/selectlist',
  DETAILS: (uuid: string) => `/dentist/${uuid}`,
}
