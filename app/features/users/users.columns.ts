import { h } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { User } from '~/types'
import BaseBadge from '~/components/base/badge/BaseBadge.vue'
import { Button } from '~/components/ui/button'

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
    accessorKey: 'work_email',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Email pracowniczy'),
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
  {
    accessorKey: 'is_active',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Użytkownik aktywny'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: ' text-left font-normal text-muted-foreground' },
        row.original.is_active
          ? h(BaseBadge, {
              label: 'Aktywny',
              variant: 'secondary',
              badgeClass: 'bg-green-500 text-white dark:bg-green-600',
            })
          : h(BaseBadge, {
              label: 'Nieaktywny',
              badgeClass: 'bg-red-500 text-white dark:bg-red-600',
            }),
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
