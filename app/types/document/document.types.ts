export type DocumentStatus = 'active' | 'pending' | 'archived'
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
}
