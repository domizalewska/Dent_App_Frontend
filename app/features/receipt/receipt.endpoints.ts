export const ReceiptEndpoints = {
  BASE: '/prescription',
  DETAILS: (uuid: string) => `/prescription/${uuid}`,
  BY_PATIENT: (patientUuid: string) => `/patient/${patientUuid}/prescription`,
  ISSUE: (uuid: string) => `/prescription/${uuid}/issue`,
}
