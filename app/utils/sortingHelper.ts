import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'

export const sortableHeader =
  (label: string) =>
  ({ column }: { column: any }) =>
    h(
      Button,
      {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      },
      () => [label, h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
    )
