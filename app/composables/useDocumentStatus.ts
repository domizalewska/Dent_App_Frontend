import type { DocumentStatus } from '~/types'

export const getLabelFromDocumentStatus = (status: DocumentStatus): string => {
  switch (status) {
    case 'active':
      return 'Aktywny'
    case 'pending':
      return 'Oczekuje'
    case 'archived':
      return 'Zarchiwizowany'
    default:
      return ''
  }
}

export const getBadgeClassFromDocumentStatus = (status: DocumentStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/15 text-emerald-400'
    case 'pending':
      return 'bg-amber-500/15 text-amber-400'
    case 'archived':
      return 'bg-secondary text-muted-foreground'
    default:
      return ''
  }
}
