export const RoomsEndpoints = {
  BASE: '/room',
  SELECT_LIST: '/room/selectlist',
  DETAILS: (uuid: string) => `/room/${uuid}`,
}
