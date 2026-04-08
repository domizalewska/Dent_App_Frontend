import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { JobPosition } from '~/types/job-position/job-position.type'

export const jobPositionsColumns: ColumnDef<JobPosition>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Stanowisko'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name)
    },
  },
  {
    accessorKey: 'f_name',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Nazwa żeńska'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.f_name)
    },
  },
  {
    accessorKey: 'm_name',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Nazwa męska'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.m_name)
    },
  },
]
