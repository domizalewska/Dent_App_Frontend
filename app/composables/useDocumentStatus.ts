import { DocumentStatus } from '~/types'

export const getLabelFromDocumentStatus = (status: DocumentStatus): string => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return 'Szkic'
    case DocumentStatus.SENT:
      return 'Wysłany'
    case DocumentStatus.SIGNED:
      return 'Podpisany'
    default:
      return ''
  }
}

export const getBadgeClassFromDocumentStatus = (status: DocumentStatus): string => {
  switch (status) {
    case DocumentStatus.DRAFT:
      return 'bg-secondary text-muted-foreground'
    case DocumentStatus.SENT:
      return 'bg-amber-500/15 text-amber-400'
    case DocumentStatus.SIGNED:
      return 'bg-emerald-500/15 text-emerald-400'
    default:
      return ''
  }
}
