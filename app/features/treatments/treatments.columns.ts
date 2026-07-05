import { h } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { TreatmentType } from '~/types'
import { Button } from '~/components/ui/button'
import { sortableHeader } from '~/utils/sortingHelper'

export const getTreatmentsColumns = (
  deactivateUser: (uuid: string) => void,
): ColumnDef<TreatmentType>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Nazwa'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name)
    },
    enableSorting: true,
  },
  {
    accessorKey: 'description',
    header: sortableHeader('Opis'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.getValue('description'),
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'short_description',
    header: sortableHeader('Dodatkowy opis'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.getValue('short_description'),
      )
    },
    enableSorting: true,
  },
  {
    accessorKey: 'price',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Cena'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original?.price)
    },
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Data dodania'),
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
          {
            variant: 'ghost',
            size: 'icon',
            class:
              'rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10',
            'aria-label': 'Usuń usługę',
            onClick: (e: MouseEvent) => {
              e.stopPropagation()
              deactivateUser(row.original.uuid)
            },
          },
          { default: () => h(Trash2, { class: 'size-4' }) },
        ),
      )
    },
  },
]
