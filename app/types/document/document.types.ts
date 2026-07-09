export enum DocumentStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  SIGNED = 'signed',
}

export enum DocumentTargetType {
  PATIENT = 'patient',
  EMPLOYEE = 'employee',
}

export type DocumentCategory = 'Zgoda' | 'Formularz' | 'Plan leczenia' | 'Wywiad'
export type DocumentFileType = 'pdf' | 'word'

export type Document = {
  uuid: string
  title: string
  status: DocumentStatus
  category: DocumentCategory
  patient: string
  fileType: DocumentFileType
  fileSize: string
  targetType: DocumentTargetType
}

export type DocumentTemplate = {
  uuid: string
  title: string
  category: DocumentCategory
  description?: string
}
