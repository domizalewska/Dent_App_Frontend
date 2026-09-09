import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Receipt } from '~/types/receipt/receipt.type'
import { formatDateToString } from '~/utils/formatDate'
import { sortableHeader } from '~/utils/sortingHelper'

const statusConfig: Record<string, { label: string; class: string }> = {
  active: {
    label: 'Aktywna',
    class: 'bg-green-500/15 text-green-500 border border-green-500/30',
  },
  used: {
    label: 'Zrealizowana',
    class: 'bg-blue-500/15 text-blue-500 border border-blue-500/30',
  },
  expired: {
    label: 'Wygasła',
    class: 'bg-yellow-500/15 text-yellow-500 border border-yellow-500/30',
  },
  cancelled: {
    label: 'Anulowana',
    class: 'bg-destructive/15 text-destructive border border-destructive/30',
  },
}

const defaultStatusConfig = { label: 'Nieznany', class: 'bg-muted text-muted-foreground border border-border' }

export const receiptColumns: ColumnDef<Receipt>[] = [
  {
    accessorKey: 'code',
    header: () => h('div', { class: 'text-foreground' }, 'Kod recepty'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, row.original.code),
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-foreground' }, 'Nazwa'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name),
  },
  {
    accessorKey: 'doctor',
    header: () => h('div', { class: 'text-foreground' }, 'Lekarz'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        `${row.original.doctor.first_name} ${row.original.doctor.last_name}`,
      ),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-foreground' }, 'Status'),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status] ?? defaultStatusConfig
      return h(
        'span',
        { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` },
        config.label,
      )
    },
  },
  {
    accessorKey: 'created_at',
    header: sortableHeader('Data wystawienia'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd.MM.yyyy'),
      ),
    enableSorting: true,
  },
]
