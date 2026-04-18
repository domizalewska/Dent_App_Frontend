import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { PatientType } from '~/types'
import { Button } from '~/components/ui/button'
import { Trash2 } from 'lucide-vue-next'

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
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.email)
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Telefon'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.phone)
    },
    enableSorting: true,
  },
  {
    accessorKey: 'pesel',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Pesel'),
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
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Data rejestracji'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd-MM-yyyy'),
      )
    },
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
