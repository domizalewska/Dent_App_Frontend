import { h } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { User } from '~/types'
import BaseBadge from '~/components/base/badge/BaseBadge.vue'
import { Button } from '~/components/ui/button'
import { Icon } from '@iconify/vue'

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
    enableSorting: true,
  },
  {
    accessorKey: 'email',
    header: sortableHeader('E-mail'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.getValue('email'),
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'work_email',
    header: sortableHeader('E-mail pracowniczy'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.getValue('email'),
      )
    },
    enableSorting: true,
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
        { class: ' text-left font-normal text-muted-foreground align-middle' },
        row.original.is_active
          ? h(
              BaseBadge,
              {
                label: 'Aktywny',
                variant: 'secondary',
                badgeClass:
                  'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-400',
              },
              {
                icon: () => h(Icon, { icon: 'qlementine-icons:success-12', class: 'size-3' }),
              },
            )
          : h(
              BaseBadge,
              {
                label: 'Nieaktywny',
                badgeClass:
                  'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-400',
              },
              {
                icon: () => h(Icon, { icon: 'material-symbols:cancel-outline', class: 'size-3' }),
              },
            ),
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
