import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { VisitStatus, type VisitType } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import { sortableHeader } from '~/utils/sortingHelper'

const statusConfig = (status: VisitStatus) => {
  switch (status) {
    case VisitStatus.SCHEDULED:
      return {
        label: 'Zaplanowana',
        class: 'bg-blue-500/15 text-blue-500 border border-blue-500/30',
      }
    case VisitStatus.COMPLETED:
      return {
        label: 'Zakończona',
        class: 'bg-green-500/15 text-green-500 border border-green-500/30',
      }
    case VisitStatus.NO_SHOW:
      return {
        label: 'Anulowana',
        class: 'bg-destructive/15 text-destructive border border-destructive/30',
      }
  }
}

export const patientAppointmentsColumns: ColumnDef<VisitType>[] = [
  {
    accessorKey: 'date',
    header: sortableHeader('Data'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.date, 'dd.MM.yyyy HH:mm'),
      ),
    enableSorting: true,
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-foreground' }, 'Wizyta'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-medium' },
        row.original.treatments?.map((e) => e.name),
      ),
  },
  {
    accessorKey: 'doctor',
    header: () => h('div', { class: 'text-foreground' }, 'Lekarz'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        `${row.original.doctor?.first_name} ${row.original.doctor?.last_name}`,
      ),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-foreground' }, 'Status'),
    cell: ({ row }) => {
      const config = statusConfig(row.original.status)
      return h(
        'span',
        { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` },
        config.label,
      )
    },
  },
]
