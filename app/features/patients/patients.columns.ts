import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { PatientType } from '~/types'
import { Button } from '~/components/ui/button'
import { Trash2 } from 'lucide-vue-next'
import { sortableHeader } from '~/utils/sortingHelper'

export const patientsColumns: ColumnDef<PatientType>[] = [
  {
    accessorKey: 'last_name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Użytkownik'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.original.first_name + ' ' + row.original.last_name,
      )
    },
  },
  {
    accessorKey: 'email',
    header: sortableHeader('E-mail'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.email)
    },
    enableSorting: true,
  },
  {
    accessorKey: 'phone',
    header: sortableHeader('Telefon'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.phone)
    },
    enableSorting: true,
  },
  {
    accessorKey: 'pesel',
    header: sortableHeader('Pesel'),
    cell: ({ row }) => {
      return (
        h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.pesel) ??
        'Brak danych'
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: sortableHeader('Data rejestracji'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd-MM-yyyy'),
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        h(
          Button,
          { variant: 'outline', size: 'icon', class: 'rounded-full' },
          { default: () => h(Trash2, { class: 'size-4' }) },
        ),
      )
    },
  },
]
