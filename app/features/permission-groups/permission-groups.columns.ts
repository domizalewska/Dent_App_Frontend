import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Pencil, Trash2, ShieldCheck } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import type { PermissionGroupType } from '~/types'
import BaseUserAvatar from '~/components/base/avatar/BaseUserAvatar.vue'

export function getPermissionGroupColumns(
  onEdit: (group: PermissionGroupType) => void,
  onAssignUsers: (group: PermissionGroupType) => void,
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
      accessorKey: 'users',
      header: () => h('div', { class: 'text-foreground' }, 'Użytkownicy'),
      cell: ({ row }) => {
        const users = row.original.users ?? []
        if (users.length === 0) return h('div', { class: 'text-sm text-muted-foreground' }, '—')
        const visible = users.slice(0, 4)
        const rest = users.slice(4)
        return h('div', { class: 'flex items-center' }, [
          ...visible.map((user, i) =>
            h(TooltipProvider, { delayDuration: 100 }, () =>
              h(Tooltip, () => [
                h(TooltipTrigger, { asChild: true }, () =>
                  h(BaseUserAvatar, {
                    user,
                    size: 'size-7',
                    class: i > 0 ? '-ml-2' : '',
                    style: { zIndex: visible.length - i },
                  }),
                ),
                h(TooltipContent, () => `${user.first_name} ${user.last_name}`),
              ]),
            ),
          ),
          rest.length > 0
            ? h(TooltipProvider, { delayDuration: 100 }, () =>
                h(Tooltip, () => [
                  h(TooltipTrigger, { asChild: true }, () =>
                    h(
                      'span',
                      {
                        class:
                          'size-7 -ml-2 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground font-medium cursor-default',
                      },
                      `+${rest.length}`,
                    ),
                  ),
                  h(TooltipContent, () =>
                    rest.map((u) => `${u.first_name} ${u.last_name}`).join(', '),
                  ),
                ]),
              )
            : null,
        ])
      },
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
              'aria-label': 'Przypisz użytkowników',
              onClick: (e: MouseEvent) => {
                e.stopPropagation()
                onAssignUsers(row.original)
              },
            },
            { default: () => h(ShieldCheck, { class: 'size-4' }) },
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
