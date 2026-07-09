import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Document } from '~/types'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Download } from 'lucide-vue-next'
import { getLabelFromDocumentStatus, getBadgeClassFromDocumentStatus } from '~/composables/useDocumentStatus'
import { sortableHeader } from '~/utils/sortingHelper'

export const getDocumentsColumns = (
  onDownload: (doc: Document) => void,
): ColumnDef<Document>[] => [
  {
    accessorKey: 'title',
    header: sortableHeader('Tytuł'),
    cell: ({ row }) =>
      h('div', { class: 'font-medium text-foreground' }, row.original.title),
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: sortableHeader('Kategoria'),
    cell: ({ row }) =>
      h('div', { class: 'text-muted-foreground' }, row.original.category),
    enableSorting: true,
  },
  {
    accessorKey: 'patient',
    header: sortableHeader('Pacjent'),
    cell: ({ row }) =>
      h('div', { class: 'text-muted-foreground' }, row.original.patient),
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-foreground' }, 'Status'),
    cell: ({ row }) =>
      h(
        Badge,
        { class: getBadgeClassFromDocumentStatus(row.original.status) },
        { default: () => getLabelFromDocumentStatus(row.original.status) },
      ),
  },
  {
    accessorKey: 'fileType',
    header: () => h('div', { class: 'text-foreground' }, 'Format'),
    cell: ({ row }) =>
      h('div', { class: 'uppercase text-muted-foreground' }, row.original.fileType),
  },
  {
    accessorKey: 'fileSize',
    header: () => h('div', { class: 'text-foreground' }, 'Rozmiar'),
    cell: ({ row }) =>
      h('div', { class: 'text-muted-foreground' }, row.original.fileSize),
  },
  {
    id: 'actions',
    header: () => h('div', {}),
    cell: ({ row }) =>
      h(
        Button,
        {
          variant: 'ghost',
          size: 'icon',
          class: 'size-8',
          onClick: (e: Event) => {
            e.stopPropagation()
            onDownload(row.original)
          },
        },
        { default: () => h(Download, { class: 'size-4' }) },
      ),
  },
]
