import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { User } from '~/types'

export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Użytkownik'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name)
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
    accessorKey: 'last_active',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Ostatnia aktywność'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.last_active, 'dd-MM-yyyy'),
      )
    },
  },
]
