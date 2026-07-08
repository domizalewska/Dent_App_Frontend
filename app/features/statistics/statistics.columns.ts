import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { StatisticUser } from '~/types'
import StatisticsUserColumnAction from '~/components/statistics/columns/StatisticsUserColumnAction.vue'

export const statisticsUsersColumns: ColumnDef<StatisticUser>[] = [
  {
    accessorKey: 'user',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Pracownik'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        `${row.original.user.first_name} ${row.original.user.last_name}`,
      ),
  },
  {
    accessorKey: 'job_position',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Stanowisko'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        row.original.user.job_position?.name ?? '—',
      ),
  },
  {
    accessorKey: 'work_hours',
    header: () =>
      h('div', { class: 'flex item-center text-center text-foreground' }, 'Godziny pracy'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        String(row.original.work_hours),
      ),
  },
  {
    accessorKey: 'vacation_hours',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Urlop'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        String(row.original.vacation_hours),
      ),
  },
  {
    accessorKey: 'sick_leave_hours',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'L4'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        String(row.original.sick_leave_hours),
      ),
  },
  {
    accessorKey: 'action',
    header: () => h('div', {}),
    cell: ({ row }) => h(StatisticsUserColumnAction, { uuid: row.original.user.uuid }),
  },
]
