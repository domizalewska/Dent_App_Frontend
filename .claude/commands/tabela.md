# Skill: /tabela

Generujesz tabelę dla podanej feature zgodnie z wzorcami projektu dent_app_frontend.

## Wejście

Użytkownik poda: nazwę feature (np. `treatment`) i typ danych (np. `Treatment`).
Opcjonalnie: listę pól do wyświetlenia z ich typami i polskimi nagłówkami.

## Co generujesz

Zawsze tworzysz **dwa pliki** (lub aktualizujesz istniejące):

### 1. `app/features/<feature>/<feature>.columns.ts`

```typescript
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { <Type> } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import { sortableHeader } from '~/utils/sortingHelper'

export const <feature>Columns: ColumnDef<<Type>>[] = [
  // Kolumny tekstowe:
  {
    accessorKey: '<field>',
    header: () => h('div', { class: 'text-foreground' }, '<PL nagłówek>'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.<field>),
  },
  // Kolumny z datą (enableSorting: true + sortableHeader):
  {
    accessorKey: 'created_at',
    header: sortableHeader('Data'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd.MM.yyyy')),
    enableSorting: true,
  },
  // Kolumna statusu (badge):
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-foreground' }, 'Status'),
    cell: ({ row }) => {
      const config = statusConfig[row.original.status] ?? defaultStatusConfig
      return h('span', { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` }, config.label)
    },
  },
]
```

Status badge config (dodaj przed `export` jeśli feature ma status):
```typescript
const statusConfig: Record<string, { label: string; class: string }> = {
  active: { label: 'Aktywny', class: 'bg-green-500/15 text-green-500 border border-green-500/30' },
  inactive: { label: 'Nieaktywny', class: 'bg-destructive/15 text-destructive border border-destructive/30' },
}
const defaultStatusConfig = { label: 'Nieznany', class: 'bg-muted text-muted-foreground border border-border' }
```

### 2. `app/components/<feature>/table/<Feature>Table.vue`

```vue
<script setup lang="ts">
import { <feature>Columns, <Feature>Endpoints } from '~/features/<feature>'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { <Type> } from '~/types'

interface Props {
  // parentUuid jeśli tabela jest w kontekście rodzica (np. patientUuid)
  parentUuid?: string
}

const props = defineProps<Props>()

const { data } = usePaginatedAPI<<Type>>(() =>
  props.parentUuid
    ? <Feature>Endpoints.BY_PARENT(props.parentUuid)
    : <Feature>Endpoints.BASE,
)
</script>

<template>
  <DataTable :columns="<feature>Columns" :data="data?.data ?? []" />
</template>
```

## Zasady

- Nie importuj z `'vue'` rzeczy które są auto-importowane (ref, computed, usePaginatedAPI)
- Nazwy: `<feature>Columns` (camelCase), komponent `<Feature>Table.vue` (PascalCase)
- Pamiętaj że `usePaginatedAPI` zwraca `{ data: items[], pagination: {...} }` — używaj `data?.data`
- `sortableHeader` tylko gdy `enableSorting: true`
- Nie dodawaj mock data do komponentu tabeli
- Upewnij się że endpoint istnieje w `<feature>.endpoints.ts` przed użyciem
- Zaktualizuj `app/features/<feature>/index.ts` jeśli dodajesz nowy eksport z columns.ts

## Wywołanie

Użytkownik pisze np.:
> /tabela treatment Treatment pola: name, type, status, created_at

Ty:
1. Sprawdzasz czy `app/features/treatment/` istnieje i co tam jest
2. Tworzysz/aktualizujesz `treatment.columns.ts`
3. Tworzysz `app/components/treatment/table/TreatmentTable.vue`
4. Weryfikujesz że `index.ts` eksportuje columns
