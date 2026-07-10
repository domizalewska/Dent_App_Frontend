import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { DailyDetailEntry } from '~/types'
import { useHoursTypeMeta } from '~/composables/statistics/useHoursTypeMeta'
import { formatDateToString } from '~/utils/formatDate'
import BaseBadge from '~/components/base/badge/BaseBadge.vue'

const { labels, badgeStyles } = useHoursTypeMeta()

export const statisticsDailyColumns: ColumnDef<DailyDetailEntry>[] = [
  {
    accessorKey: 'date',
    header: () => h('div', { class: 'text-foreground' }, 'Data'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.date, 'dd.MM.yyyy'),
      ),
  },
  {
    accessorKey: 'type',
    header: () => h('div', { class: 'text-foreground' }, 'Typ'),
    cell: ({ row }) =>
      h(BaseBadge, {
        label: labels[row.original.type],
        badgeClass: badgeStyles[row.original.type],
      }),
  },
  {
    accessorKey: 'source',
    header: () => h('div', { class: 'text-foreground' }, 'Źródło'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.source),
  },
  {
    accessorKey: 'hours',
    header: () => h('div', { class: 'text-foreground' }, 'Godziny'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, `${row.original.hours}h`),
  },
]
