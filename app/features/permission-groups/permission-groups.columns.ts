import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Pencil, Shield, Trash2 } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import type { PermissionGroupType } from '~/types'

export function getPermissionGroupColumns(
  onEdit: (group: PermissionGroupType) => void,
  onAssign: (group: PermissionGroupType) => void,
  onDelete: (uuid: string) => void,
): ColumnDef<PermissionGroupType>[] {
  return [
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-foreground' }, 'Nazwa'),
      cell: ({ row }) => h('div', { class: 'font-medium' }, row.original.name),
    },
    {
      accessorKey: 'description',
      header: () => h('div', { class: 'text-foreground' }, 'Opis'),
      cell: ({ row }) =>
        h('div', { class: 'text-muted-foreground text-sm' }, row.original.description ?? '—'),
    },
    {
      accessorKey: 'permissions',
      header: () => h('div', { class: 'text-foreground' }, 'Uprawnienia'),
      cell: ({ row }) =>
        h(
          'div',
          { class: 'text-sm text-muted-foreground' },
          `${row.original.permissions.length} uprawnień`,
        ),
    },
    {
      accessorKey: 'action',
      header: () => h('div', {}),
      cell: ({ row }) =>
        h('div', { class: 'flex items-center justify-end gap-1' }, [
          h(
            Button,
            {
              variant: 'ghost',
              size: 'icon',
              class: 'rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10',
              'aria-label': 'Zarządzaj uprawnieniami',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                onAssign(row.original)
              },
            },
            { default: () => h(Shield, { class: 'size-4' }) },
          ),
          h(
            Button,
            {
              variant: 'ghost',
              size: 'icon',
              class: 'rounded-full text-muted-foreground hover:bg-accent',
              'aria-label': 'Edytuj grupę',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                onEdit(row.original)
              },
            },
            { default: () => h(Pencil, { class: 'size-4' }) },
          ),
          h(
            Button,
            {
              variant: 'ghost',
              size: 'icon',
              class:
                'rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10',
              'aria-label': 'Usuń grupę',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                onDelete(row.original.uuid)
              },
            },
            { default: () => h(Trash2, { class: 'size-4' }) },
          ),
        ]),
    },
  ]
}
