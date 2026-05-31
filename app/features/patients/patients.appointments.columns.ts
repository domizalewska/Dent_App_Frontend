import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { AppointmentType, AppointmentStatus } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import { sortableHeader } from '~/utils/sortingHelper'

const statusConfig: Record<AppointmentStatus, { label: string; class: string }> = {
  scheduled: {
    label: 'Zaplanowana',
    class: 'bg-blue-500/15 text-blue-500 border border-blue-500/30',
  },
  completed: {
    label: 'Zakończona',
    class: 'bg-green-500/15 text-green-500 border border-green-500/30',
  },
  cancelled: {
    label: 'Anulowana',
    class: 'bg-destructive/15 text-destructive border border-destructive/30',
  },
}

export const patientAppointmentsColumns: ColumnDef<AppointmentType>[] = [
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
      h('div', { class: 'text-left font-medium' }, row.original.name),
  },
  {
    accessorKey: 'doctor',
    header: () => h('div', { class: 'text-foreground' }, 'Lekarz'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        `${row.original.doctor.first_name} ${row.original.doctor.last_name}`,
      ),
  },
  {
    accessorKey: 'duration_minutes',
    header: () => h('div', { class: 'text-foreground' }, 'Czas trwania'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-left font-normal text-muted-foreground' },
        `${row.original.duration_minutes} min`,
      ),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-foreground' }, 'Status'),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status]
      return h(
        'span',
        { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` },
        config.label,
      )
    },
  },
]
