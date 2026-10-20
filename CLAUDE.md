# Claude Code — wytyczne projektu dent_app_frontend

## Stack

- **Nuxt 3** + **Vue 3** Composition API (`<script setup lang="ts">`)
- **TypeScript**, **Tailwind CSS**, **shadcn-vue**, **Reka UI**
- **Vee-validate** + **Zod** (`@vee-validate/zod`) dla formularzy
- **TanStack Table** (`@tanstack/vue-table`) dla tabel
- **lucide-vue-next** dla ikon

---

## Struktura projektu

```
app/
  components/
    base/          # Wielokrotnego użytku (BaseInputForm, BaseSelectForm, BaseFileUpload, ...)
    ui/            # shadcn-vue (Button, Card, Dialog, Select, ...)
    <feature>/     # card/ dialog/ form/ header/ tab/ table/ tabs/ widgets/
  composables/     # useAPI, usePaginatedAPI, usePagination, ...
  features/        # <feature>/index.ts, endpoints.ts, columns.ts, key.ts
  pages/
  types/
  utils/           # formatDate, sortingHelper, toast
```

### Struktura feature (`app/features/<feature>/`)

Każda feature zawiera:
- `<feature>.endpoints.ts` — stałe URL
- `<feature>.columns.ts` — definicje kolumn TanStack Table
- `<feature>.key.ts` — klucze cache
- `index.ts` — re-eksportuje wszystko: `export * from './...'`

---

## Wzorce kodu

### Endpoints

```typescript
export const ExampleEndpoints = {
  BASE: '/example',
  LIST_SELECT: '/example/selectlist',
  DETAILS: (uuid: string) => `/example/${uuid}`,
  BY_PARENT: (parentUuid: string) => `/parent/${parentUuid}/example`,
}
```

### Cache keys

```typescript
export const examplesKey = 'examples'
export const exampleDetailKey = (uuid: string) => `example-${uuid}`
```

### Kolumny tabeli

```typescript
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { ExampleType } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import { sortableHeader } from '~/utils/sortingHelper'

export const exampleColumns: ColumnDef<ExampleType>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-foreground' }, 'Nazwa'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.name),
  },
  {
    accessorKey: 'created_at',
    header: sortableHeader('Data'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd.MM.yyyy')),
    enableSorting: true,
  },
]
```

Status badge w kolumnie:
```typescript
const statusConfig: Record<string, { label: string; class: string }> = {
  active: { label: 'Aktywny', class: 'bg-green-500/15 text-green-500 border border-green-500/30' },
  inactive: { label: 'Nieaktywny', class: 'bg-destructive/15 text-destructive border border-destructive/30' },
}
const defaultStatusConfig = { label: 'Nieznany', class: 'bg-muted text-muted-foreground border border-border' }

// w cell:
const config = statusConfig[row.original.status] ?? defaultStatusConfig
return h('span', { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` }, config.label)
```

### Pobieranie danych (composables)

```typescript
// Prosta lista (paginowana)
const { data } = usePaginatedAPI<ItemType>(() => ExampleEndpoints.BY_PARENT(props.uuid))
// data.value?.data — tablica, data.value?.pagination — paginacja

// Pojedynczy zasób
const { data, refresh } = useAPI<ItemType>(ExampleEndpoints.DETAILS(uuid))

// Z kluczem (do invalidacji)
const { data } = useAPI<ItemType>(url, { key: exampleDetailKey(uuid) })
```

### Formularz (vee-validate + zod)

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'

const emit = defineEmits(['confirm', 'cancel'])

const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Nazwa jest wymagana'),
    type: z.string().nonempty('Typ jest wymagany'),
  }),
)

async function onSubmit(values: PayloadType) {
  emit('confirm', values)
}
</script>

<template>
  <Form :validation-schema="formSchema" class="flex flex-1 flex-col min-h-0 overflow-hidden" @submit="onSubmit">
    <div class="flex-1 overflow-y-auto min-h-0 px-3 py-4 flex flex-col gap-4">
      <BaseInputForm name="name" label="Nazwa" placeholder="Wpisz nazwę" type="text" />
      <BaseSelectForm name="type" label="Typ" placeholder="Wybierz typ" :options="[...]" />
    </div>
    <div class="border-t px-3 py-3">
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
```

### Dialog + Form

```vue
<!-- Dialog.vue -->
<script setup lang="ts">
import ExampleForm from '~/components/example/form/ExampleForm.vue'
import { useAPI } from '~/composables/useAPI'
import { toast } from 'vue-sonner'
import { toastSuccessStyle, toastErrorStyle } from '~/utils/toast'

const emit = defineEmits(['close'])

interface Props { parentUuid: string }
defineProps<Props>()

async function handleSubmit(payload: PayloadType) {
  const request = useAPI(ExampleEndpoints.BASE, { method: 'POST', body: payload })
  toast.promise(request, {
    loading: 'Zapisuję...',
    success: () => { emit('close'); return 'Zapisano' },
    error: 'Błąd podczas zapisywania',
    style: toastSuccessStyle,
    errorStyle: toastErrorStyle,
  })
}
</script>

<template>
  <Dialog :open="true" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader><DialogTitle>Dodaj przykład</DialogTitle></DialogHeader>
      <ExampleForm @confirm="handleSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
```

Renderowanie dialogu w rodzicu — używaj `v-if` żeby dialog unmountował się po zamknięciu:
```vue
<Button @click="showDialog = true">Dodaj</Button>
<ExampleDialog v-if="showDialog" :parent-uuid="uuid" @close="showDialog = false" />
```

### Tabela

```vue
<script setup lang="ts">
import { exampleColumns, ExampleEndpoints } from '~/features/example'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { ExampleType } from '~/types'

interface Props { parentUuid: string }
const props = defineProps<Props>()

const { data } = usePaginatedAPI<ExampleType>(() => ExampleEndpoints.BY_PARENT(props.parentUuid))
</script>

<template>
  <DataTable :columns="exampleColumns" :data="data?.data ?? []" />
</template>
```

---

## Konwencje Vue/TypeScript

- `defineEmits(['event1', 'event2'])` — **nie** TypeScript generic form
- Zawsze `<script setup lang="ts">`
- Props interface definiuj inline przed `defineProps`
- Nie dodawaj komentarzy do kodu jeśli nie są konieczne
- Nie commituj zmian bez pytania użytkownika
- Nie instaluj paczek bez zgody użytkownika

---

## Komponenty bazowe (najważniejsze)

| Komponent | Do czego |
|---|---|
| `BaseInputForm` | Input z vee-validate (`name`, `label`, `placeholder`, `type`) |
| `BaseSelectForm` | Select z opcjami lub z API (`name`, `apiUrl`, `options`, `optionValue`, `optionLabel`) |
| `BaseFileUpload` | Upload plików (`endpoint`, `accept`, `refreshKeys`) |
| `BaseImageList` | Lista zdjęć (`endpoint`, `downloadUrl`, `deleteUrl`) |

### BaseSelectForm — ważne szczegóły

- `immediate-fetch` tylko gdy `api-url` jest podane — inaczej wywoła CORS na `/api`
- `option-value` i `option-label` przyjmują string (klucz) lub funkcję `(e: T) => string`
- `assign-value` — dodaje aktualną wartość do listy opcji gdy nie ma jej w wynikach API

---

## Znane problemy / workarounds

### Select wewnątrz Dialog (Reka UI)

Reka UI `SelectContentImpl` wywołuje `useHideOthers()` co ukrywa dialog przez `aria-hidden`.
Workaround: `SelectContent.vue` ma `:disable-outside-pointer-events="false"`.
Jeśli Select w Dialog nadal nie działa — sprawdź czy SelectPortal montuje w body zamiast w Dialog.

---

## Testy Playwright

Testy Playwright będą w katalogu `e2e/` (jeszcze nie istnieją).
Używaj skilla `/test` do generowania testów zgodnych z projektem.
