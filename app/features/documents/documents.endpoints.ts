export const DocumentsEndpoints = {
  BASE: '/document',
  TEMPLATES: '/document/template',
  DETAILS: (uuid: string) => `/document/${uuid}`,
  DOWNLOAD: (uuid: string) => `/document/${uuid}/download`,
}
