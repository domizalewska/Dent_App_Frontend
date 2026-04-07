import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { JobPosition } from '~/types/job-position/job-position.type'

export const jobPositionsColumns: ColumnDef<JobPosition>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Użytkownik'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name)
    },
  },
  {
    accessorKey: 'f_name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.f_name)
    },
  },
  {
    accessorKey: 'm_name',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Email pracowniczy'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.m_name)
    },
  },
]
