import { h } from 'vue';
import type { ColumnDef } from '@tanstack/vue-table';
import type { User } from '~/types/users/typesUsers';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Id'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.id);
    },
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Name'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.name);
    },
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Email'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.email);
    },
  },
  {
    accessorKey: 'phone',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Phone'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.phone);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'is_active',
    header: () => h('div', { class: 'flex item-center text-center' }, 'Active'),
    cell: ({ row }) => {
      return h('div', { class: 'text-right font-medium' }, row.original.is_active);
    },
  },
];
