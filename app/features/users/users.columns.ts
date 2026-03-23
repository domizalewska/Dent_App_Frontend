import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { User } from '~/types'

export const usersColumns: ColumnDef<User>[] = [
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
]
