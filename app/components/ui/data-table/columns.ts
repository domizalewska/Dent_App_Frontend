import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { User } from '~/types/users/typesUsers';
import { formatDateToString } from '~/utils/formatDate';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Użytkownik'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal' }, row.original.name);
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal' }, row.original.email);
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Telefon'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-normal' }, row.original.phone);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'last_active',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Aktywność'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-normal' },
        formatDateToString(row.original.last_active, 'dd-MM-yyyy'),
      );
    },
  },
];
