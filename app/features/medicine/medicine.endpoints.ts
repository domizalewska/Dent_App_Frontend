export const MedicineEndpoints = {
  BASE: '/medicine',
  LIST_SELECT: '/medicine/selectlist',
  DETAILS: (uuid: string) => `/medicine/${uuid}`,
}
