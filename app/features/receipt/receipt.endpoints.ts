export const ReceiptEndpoints = {
  BASE: '/receipt',
  DETAILS: (uuid: string) => `/receipt/${uuid}`,
  BY_PATIENT: (patientUuid: string) => `/patient/${patientUuid}/receipt`,
}
