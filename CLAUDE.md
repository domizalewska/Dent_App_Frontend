# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Nuxt 3** + **Vue 3** Composition API (`<script setup lang="ts">`)
- **TypeScript** (strict), **Tailwind CSS v4**, **shadcn-vue** / **Reka UI**
- **Vee-validate** + **Zod** (`@vee-validate/zod`) dla formularzy
- **TanStack Table** (`@tanstack/vue-table`) dla tabel
- **lucide-vue-next** dla ikon, **@iconify/vue** dla pozostałych

---

## Komendy

```bash
npm run dev          # dev server (localhost:3000)
npm run build        # produkcyjny build
npm run lint         # ESLint
npm run lint:fix     # ESLint z auto-fixem
npm run format       # Prettier check
npm run format:fix   # Prettier write
```

Styl kodu: Prettier (semi: false, singleQuote, trailingComma: all, printWidth: 100, tabWidth: 2, endOfLine: lf). ESLint ignoruje `app/components/ui/**`.

---

## Struktura projektu

```
app/
  components/
    base/            # Wielokrotnego użytku — form/, buttons/, dialog/, file/, card/, ...
    ui/              # shadcn-vue (nie modyfikować)
    <feature>/       # card/ dialog/ form/ header/ tab/ table/ tabs/ widgets/
  composables/
    use*.ts          # Globalne composables (useAPI, usePagination, useAuth, ...)
    <feature>/       # Feature composables CRUD (usePatient, useAppointments, ...)
  features/
    <feature>/       # endpoints.ts, key.ts, [columns.ts], index.ts
  pages/
  plugins/           # api.ts ($api), echo.client.ts (WebSocket)
  middleware/        # auth.global.ts
  types/
    <domain>/        # *.type.ts + index.ts
    routes/          # PatientRoutes, ProfileRoutes, StatisticsRoutes
    index.ts         # barrel — eksportuje wszystkie domeny
  utils/             # formatDate, sortingHelper, toast, formatBaseToBlob
  lib/               # utils.ts (cn helper)
  mock/              # dane testowe per feature
```

---

## Warstwa features (`app/features/<feature>/`)

Każda feature zawiera:
- `<feature>.endpoints.ts` — stałe URL API
- `<feature>.key.ts` — klucze cache do `refreshNuxtData`
- `<feature>.columns.ts` — definicje kolumn TanStack Table (jeśli feature ma tabelę)
- `index.ts` — re-eksport: `export * from './...'`

Niektóre features mają **wiele plików kolumn** (np. `patients` ma `patients.columns.ts` i `patients.appointments.columns.ts`).

### Endpoints

```typescript
// app/features/patients/patients.endpoints.ts
export const PatientsEndpoints = {
  BASE: '/patient',
  LIST_SELECT: '/patient/selectlist',
  EXPORT: '/patient/export',
  DETAILS: (uuid: string) => `/patient/${uuid}`,
  VISITS: (uuid: string) => `/patient/${uuid}/visits`,
  FILE_UPLOADS: (uuid: string) => `/patient/${uuid}/file`,
  FILE_DOWNLOAD: (uuid: string, fileUuid: string) => `/patient/${uuid}/file-download/${fileUuid}`,
  FILE_DELETE: (uuid: string, fileUuid: string) => `/patient/${uuid}/file/${fileUuid}`,
  STATISTICS: (uuid: string) => `/patient/${uuid}/statistics`,
  PHOTO_LIST: (uuid: string) => `/patient/${uuid}/photo`,
  PHOTO_STORE: (uuid: string) => `/patient/${uuid}/photo`,
  PHOTO_DOWNLOAD: (uuid: string, photoUuid: string) => `/patient/${uuid}/photo-download/${photoUuid}`,
  PHOTO_DETAILS: (uuid: string, photoUuid: string) => `/patient/${uuid}/photo/${photoUuid}`,
}
```

### Cache keys

```typescript
// app/features/patients/patients.key.ts
export const patientsKey = 'patients'
export const patientDetailKey = (uuid: string) => `patient-${uuid}`
export const patientStatisticsKey = (uuid: string) => `patient-statistics-${uuid}`
```

Klucze są tablicami lub pojedynczymi stringami w `refreshNuxtData`:
```typescript
refreshNuxtData(patientsKey)
refreshNuxtData([patientsKey, patientDetailKey(uuid), patientStatisticsKey(uuid)])
```

### Kolumny tabeli

```typescript
// app/features/patients/patients.columns.ts
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { formatDateToString } from '~/utils/formatDate'
import type { PatientType } from '~/types'
import { Button } from '~/components/ui/button'
import { Trash2 } from 'lucide-vue-next'
import { sortableHeader } from '~/utils/sortingHelper'

export const patientsColumns: ColumnDef<PatientType>[] = [
  {
    accessorKey: 'last_name',
    header: () => h('div', { class: 'flex item-center text-center text-foreground' }, 'Użytkownik'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' },
        row.original.first_name + ' ' + row.original.last_name),
  },
  {
    accessorKey: 'email',
    header: sortableHeader('E-mail'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' }, row.original.email),
    enableSorting: true,
  },
  {
    accessorKey: 'created_at',
    header: sortableHeader('Data rejestracji'),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-normal text-muted-foreground' },
        formatDateToString(row.original.created_at, 'dd-MM-yyyy')),
    enableSorting: true,
  },
  {
    accessorKey: 'action',
    header: () => h('div', {}),
    cell: () =>
      h('div', {}, h(Button, { variant: 'outline', size: 'icon', class: 'rounded-full' },
        { default: () => h(Trash2, { class: 'size-4' }) })),
  },
]
```

Status badge w kolumnie (wzorzec switch):
```typescript
const statusConfig = (status: VisitStatus) => {
  switch (status) {
    case VisitStatus.SCHEDULED:
      return { label: 'Zaplanowana', class: 'bg-blue-500/15 text-blue-500 border border-blue-500/30' }
    case VisitStatus.COMPLETED:
      return { label: 'Zakończona', class: 'bg-green-500/15 text-green-500 border border-green-500/30' }
    case VisitStatus.NO_SHOW:
      return { label: 'Anulowana', class: 'bg-destructive/15 text-destructive border border-destructive/30' }
  }
}
// w cell:
const config = statusConfig(row.original.status)
return h('span', { class: `text-xs px-2.5 py-0.5 rounded-full font-medium ${config.class}` }, config.label)
```

---

## Warstwa typów (`app/types/`)

### Struktura folderu

Każda domena ma podfolder z plikiem typu i `index.ts`:
```
types/
  patient/
    patient.type.ts   ← definicje
    index.ts          ← export * from './patient.type'
  user/
    user.type.ts
    index.ts
  ...
  routes/             ← NIE eksportowane przez types/index.ts, importuj osobno
    PatientRoutes.ts
    ProfileRoutes.ts
    StatisticsRoutes.ts
    index.ts
  index.ts            ← eksportuje wszystkie domeny przez export *
```

### Barrel export — importowanie typów

```typescript
// Dowolny typ z projects: importuj z '~/types'
import type { Patient, PatientPayload, User, VisitType, VisitStatus } from '~/types'

// Routes: importuj z '~/types/routes'
import { PatientRoutes, ProfileRoutes, StatisticsRoutes } from '~/types/routes'
// PatientRoutes.PATIENT_PROFILE(uuid) → '/patients/:uuid'
```

### Kluczowe typy domenowe

```typescript
// patient/patient.type.ts
type Patient = {
  uuid: string
  first_name: string; last_name: string
  email?: string; phone_number?: string
  gender?: string; pesel?: string
  street: string; house_number: string; apartment_number: string; postal_code: string; city: string
  notes: string
  doctor: User
  is_active: boolean; created_at: Date; updated_at: Date
}
type PatientPayload = Omit<Patient, 'uuid' | 'doctor'> & { doctor_uuid?: string }

// user/user.type.ts
enum UserStatus { ACTIVE = 'ACTIVE', NON_ACTIVE = 'NON_ACTIVE' }
type User = { uuid: string; first_name: string; last_name: string; status?: UserStatus;
  email: string; pesel: string; is_active: boolean; is_admin: boolean;
  job_positions?: JobPosition[]; competencies: TreatmentType[]; ... }
type UserPayload = { first_name: string; last_name: string; email: string; pesel: string;
  job_positions?: string[]; is_active: boolean; competencies?: TreatmentType[]; ... }

// visits/appoitment.type.ts
enum VisitStatus { COMPLETED = 'COMPLETED', NO_SHOW = 'NO_SHOW', SCHEDULED = 'SCHEDULED' }
type VisitType = { uuid: string; date: string; status: VisitStatus; doctor: User | null; treatments: TreatmentType[] }

// calendar/calendar.type.ts
enum CalendarType { WORK, SICK_LEAVE, VACATION, EXAMINATION, OTHER }

// api/pagination.types.ts
type PaginatedResult<T> = { data: T[]; current_page: number; from: number; last_page: number; per_page: number; to: number; total: number }
type PaginatedResponse<T> = { data: T[]; pagination: PaginationData }
type PaginationOptions = { stateKey?: string; initialPage?: number; initialPerPage?: number; initialSort?: string; ... }

// export/export.type.ts
type ExportType = 'xlsx' | 'csv' | 'pdf'
const FileExtensions = { xlsx: '.xlsx', csv: '.csv', pdf: '.pdf' }
```

---

## Warstwa composables (`app/composables/`)

### Globalne — pobieranie danych

```typescript
// useAPI.ts — wraper useFetch z $api, server: false
export function useAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {})
export function usePaginatedAPI<T>(url: string | (() => string), options?: object)
// usePaginatedAPI transformuje PaginatedResult<T> → PaginatedResponse<T>
// data.value?.data — tablica, data.value?.pagination — metadane

// Użycie:
const { data, pending, refresh } = useAPI<Patient>(PatientsEndpoints.DETAILS(uuid))
const { data } = usePaginatedAPI<PatientType>(() => PatientsEndpoints.BASE)
const { data } = useAPI<ItemType>(url, { key: patientDetailKey(uuid) })  // z kluczem cache
```

### usePagination — stan paginacji z sessionStorage

```typescript
const pagination = usePagination({ stateKey: 'patients', initialPerPage: 15, initialSort: 'created_at,desc' })

// Zwraca (readonly refs + metody):
pagination.paramsData     // computed: { page, perPage, sort, searchString, ...filters }
pagination.pagination     // { current_page, from, last_page, per_page, to }
pagination.sort           // string | null — format: 'field,asc' lub 'field,desc'
pagination.globalSearch   // string | null
pagination.filters        // FilterModel
pagination.sortingState   // SortingState (dla TanStack Table)
pagination.filtersCount   // liczba aktywnych filtrów

pagination.setPage(n)
pagination.setPerPage(n)
pagination.setSort(updater)   // przyjmuje Updater<SortingState> z TanStack
pagination.setSearch(value)
pagination.setFilters(data)   // czyści null/undefined/''
pagination.clearFilters()
pagination.resetPagination()

// Bez stateKey — stan tylko w pamięci (nie persystuje)
// Ze stateKey — persystuje w sessionStorage (paginacja, sort, search, filtry)
```

### useSorting — sortowanie dla TanStack Table (bez paginacji)

```typescript
const { sorting, sortingParams, onSortingChange } = useSorting()
// sortingParams: { sort: 'field,asc' } lub {}
// onSortingChange: przekazać do :onSortingChange DataTable
```

### Feature composables (`app/composables/<feature>/`)

Composables CRUD żyją w `app/composables/<feature>/use<Feature>.ts`. Wzorzec:

```typescript
// app/composables/patient/usePatient.ts
export const usePatient = () => {
  const { $api } = useNuxtApp()
  const api = $api as typeof $fetch

  async function addRecord(payload: PatientType) {
    return toast.promise(
      api(PatientsEndpoints.BASE, { method: 'POST', body: payload })
        .then(() => refreshNuxtData(patientsKey)),
      {
        success: { message: 'Dodany nowy rekord', style: toastSuccessStyle },
        error: { message: 'Błąd podczas dodawania rekordu', style: toastErrorStyle },
      },
    )
  }

  async function editRecord(uuid: string, payload: Partial<PatientType>) {
    return toast.promise(
      api(PatientsEndpoints.DETAILS(uuid), { method: 'PUT', body: payload })
        .then(() => refreshNuxtData([patientsKey, patientDetailKey(uuid), patientStatisticsKey(uuid)])),
      {
        success: { message: 'Zmiany zostały zapisane', style: toastSuccessStyle },
        error: { message: 'Błąd podczas zapisywania zmian', style: toastErrorStyle },
      },
    )
  }

  async function deleteRecord(uuid: string) {
    return toast.promise(
      api(PatientsEndpoints.DETAILS(uuid), { method: 'DELETE' })
        .then(() => refreshNuxtData(patientsKey)),
      {
        success: { message: 'Rekord został usunięty', style: toastSuccessStyle },
        error: { message: 'Błąd podczas usuwania rekordu', style: toastErrorStyle },
      },
    )
  }

  return { addRecord, editRecord, deleteRecord }
}
```

Dostępne feature composables:
- `usePatient` — `addRecord`, `editRecord`, `deleteRecord`
- `useAppointments` — `addAppointment`, `editAppointment`, `deleteRecord`
- `useUser` — `addUser`, `editUser`, `deactivateUser`
- `useTreatments`, `useJobPositions`, `useAnnouncements`, `useScheduleRule`, `useProfile`

### Pozostałe composables

```typescript
useAuth()          // user, token, isAuthenticated, loginUser(), logoutUser()
useDialog()        // activeComponent, activeProps, open(component, props), close()
useDocumentStatus()   // getStatusLabel(status), getStatusClass(status)
useScheduleColors()   // localStorage per CalendarType
useStatisticsPeriod() // period: { year, month } via useState
```

---

## Plugin `$api` (`app/plugins/api.ts`)

Wszystkie żądania HTTP idą przez `useNuxtApp().$api` — customowy `$fetch.create()` z:
- `baseURL`: z `useRuntimeConfig().public.apiBase` (domyślnie `/api`)
- **Request interceptor**: `Authorization: Bearer {token}` z `localStorage`
- **Response error interceptor**:
  - `401` → `logoutUser()` + redirect na `/login`
  - `403` → toast "Brak uprawnień"
  - `422` → toast z pierwszym błędem z `response._data.errors`
  - `404` → toast "Nie znaleziono"
  - inne → toast z `response._data.message`

**Nigdy nie używaj `$fetch` bezpośrednio** — tylko przez `useAPI`, `usePaginatedAPI` lub `$api` w composablach mutacji.

---

## Middleware (`app/middleware/auth.global.ts`)

Globalna straż — działa tylko client-side (`import.meta.server` → return). Przekierowuje na `/login` gdy nie ma tokenu. Publiczne strony: `/login`, `/forgot-password`.

---

## Warstwa komponentów (`app/components/`)

### Komponenty bazowe — forma (`base/form/`)

Wszystkie integrują się z **vee-validate** przez `useField(props.name)`. Wymagają bycia wewnątrz `<Form>` z vee-validate.

| Komponent | Props | Uwagi |
|---|---|---|
| `BaseInputForm` | `name`, `label`, `placeholder`, `type?`, `size?`, `mask?` | Obsługuje password toggle, maska przez vMaska |
| `BaseSelectForm` | `name`, `label?`, `placeholder?`, `apiUrl?`, `apiKey?`, `options?`, `additionalOptions?`, `optionValue?`, `optionLabel?`, `optionDisabled?`, `assignValue?`, `immediateFetch?`, `withPagination?`, `additionalParams?` | Lazy fetch przy otwarciu; `withPagination` ładuje kolejne strony przy scrollu |
| `BaseTextareaForm` | `name`, `label`, `placeholder` | — |
| `BaseDateTimeForm` | `name`, `label?`, `placeholder?`, `size?`, `requiredMark?`, `rules?` | Popover z Calendar (reka-ui), wartość jako string ISO (`YYYY-MM-DD`) |
| `BaseTimePickerForm` | `name`, `label?`, `placeholder?`, `size?`, `enableSeconds?`, `range?`, `rules?` | VueDatePicker, wartość jako `HH:mm:ss` |
| `BaseSwitchForm` | `name`, `label`, `disabled?` | — |
| `BasePhoneForm` | `name`, `label?`, `rules?` | IntlTelInput, tylko kraje europejskie, domyślnie PL |
| `BaseMultiselect` | `api`, `optionValue`, `optionLabel`, `optionAvatar?`, `placeholder?`, `label?` | `defineModel<string[]>`, własny combobox z Command |

**BaseSelectForm — ważne szczegóły:**
- `immediateFetch` tylko gdy `apiUrl` jest podane — inaczej wywoła CORS na `/api`
- `optionValue` i `optionLabel` przyjmują string (klucz) lub funkcję `(e: T) => string`
- `assignValue` — dodaje aktualną wartość do listy gdy nie ma jej w wynikach API
- `withPagination` — infinite scroll, ładuje kolejne strony

### Komponenty bazowe — inne

| Komponent | Props / API |
|---|---|
| `BaseCard` | `cardTitle`, `cardDescription?`, `cardButtons?`; sloty: `header`, `description`, `content`, `footer` |
| `BaseIconButton` | `tooltip` (required), `variant?` (default: `outline`), `side?` (default: `top`) — Button z Tooltip |
| `BaseDeleteConfirmDialog` | `title?`, `description?`; `v-model:open`; emit: `confirm` |
| `BaseConfirmDialog` | podobny do Delete bez destructive stylu |
| `BaseFileUpload` | `endpoint`, `refreshKeys?`, `accept?`, `dropDataTypes?` — drag&drop, max 5 plików × 5MB |
| `BaseFileList` | `endpoint`, `downloadUrl`, `deleteUrl` — lista plików z pobieraniem/usuwaniem |
| `BaseImageList` | `endpoint`, `downloadUrl`, `deleteUrl` — lista zdjęć z podglądem |
| `BaseExportFile` | `extensions: ExportType[]`, `endpoint`, `params?`, `fileName?` — dropdown eksportu (xlsx/csv/pdf) |
| `BaseTableSearch` | `modelValue?`; emit: `search` — debounce 1500ms |
| `BaseUserAvatar` | awatar użytkownika |
| `BaseBadge` | badge statusu |
| `BaseDatatableSkeleton` | skeleton ładowania tabeli |

### Struktura komponentów feature

Konwencja folderów — komponent feature zawiera kombinację:
```
components/<feature>/
  card/      ← karty informacyjne (np. PatientInfoCard)
  dialog/    ← dialogi modalne (np. PatientDialog)
  form/      ← formularze (np. PatientForm — emituje 'submit', 'cancel')
  header/    ← nagłówki strony/sekcji
  tab/       ← zawartość pojedynczej zakładki
  table/     ← tabele danych (np. PatientArchiveTable)
  tabs/      ← kontener zakładek (np. PatientTabs)
  widgets/   ← małe karty dashboardu
```

Nazewnictwo: `<Feature><Type>.vue` np. `PatientDialog.vue`, `PatientForm.vue`.

### Dialog + Form — wzorzec

Dialog wywołuje feature composable, Form emituje dane do rodzica:

```vue
<!-- PatientDialog.vue -->
<script setup lang="ts">
import type { Patient, PatientPayload } from '~/types'

interface Props { patient: Patient; isEdit?: boolean }
const props = defineProps<Props>()
const emit = defineEmits(['close'])

const { addRecord, editRecord } = usePatient()

async function onSubmit(values: PatientPayload) {
  if (props.isEdit) {
    await editRecord(props.patient.uuid, values)
  } else {
    await addRecord(values as Patient)
  }
  emit('close')
}
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="max-h-[85vh] flex flex-col overflow-hidden p-0">
      <DialogHeader class="border-b px-4 py-3">
        <DialogTitle>{{ isEdit ? 'Edytuj pacjenta' : 'Dodaj pacjenta' }}</DialogTitle>
      </DialogHeader>
      <PatientForm :patient="patient" @submit="onSubmit" @cancel="emit('close')" />
    </DialogContent>
  </Dialog>
</template>
```

Renderowanie w rodzicu — `v-if` unmountuje dialog:
```vue
<Button @click="showDialog = true">Dodaj</Button>
<PatientDialog v-if="showDialog" :patient="emptyPatient" @close="showDialog = false" />
```

### Formularz z vee-validate + zod

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'

interface Props { patient: Patient }
const props = defineProps<Props>()
const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(z.object({
  first_name: z.string().nonempty('Imię jest wymagane'),
  email: z.string().email('Nieprawidłowy adres email'),
  postal_code: z.string().regex(/^\d{2}-\d{3}$/, 'Format: __-___').or(z.literal('')).optional(),
}))

const initialValues = {
  first_name: props.patient.first_name,
  email: props.patient.email,
}

function onSubmit(values: PatientPayload) {
  emit('submit', values)
}
</script>

<template>
  <Form :validation-schema="formSchema" :initial-values="initialValues"
        class="flex flex-1 flex-col min-h-0 overflow-hidden" @submit="onSubmit">
    <div class="flex-1 overflow-y-auto min-h-0 px-3 py-4 flex flex-col gap-4">
      <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" />
      <BaseInputForm name="email" label="Email" placeholder="Wpisz email" type="email" />
      <BaseInputForm name="postal_code" label="Kod pocztowy" placeholder="__-___" mask="##-###" />
      <BaseSelectForm
        name="doctor_uuid"
        label="Lekarz"
        :api-url="UsersEndpoints.DENTIST_LIST_SELECT"
        :option-value="(e: User) => e.uuid"
        :option-label="(e: User) => e.first_name + ' ' + e.last_name"
        immediate-fetch
      />
      <BasePhoneForm name="phone_number" label="Telefon" />
      <BaseDateTimeForm name="birth_date" label="Data urodzenia" />
      <BaseTimePickerForm name="start_time" label="Godzina" />
      <BaseSwitchForm name="is_active" label="Aktywny" />
    </div>
    <div class="border-t px-3 py-3">
      <BaseAcceptDeclineButtons confirm-title="Zapisz" cancel-title="Anuluj"
        confirm-type="submit" @cancel="emit('cancel')" />
    </div>
  </Form>
</template>
```

### Tabela z paginacją

```vue
<script setup lang="ts">
import { patientsColumns } from '~/features/patients'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { PatientType } from '~/types'

const pagination = usePagination({ stateKey: 'patients' })
const { data } = usePaginatedAPI<PatientType>(
  () => `${PatientsEndpoints.BASE}?${new URLSearchParams(pagination.paramsData.value as any).toString()}`
)
</script>

<template>
  <DataTable
    :columns="patientsColumns"
    :data="data?.data ?? []"
    :sorting="pagination.sortingState.value"
    @update:sorting="pagination.setSort"
  />
</template>
```

---

## Konwencje Vue/TypeScript

- `defineEmits(['event1', 'event2'])` — **nie** TypeScript generic form
- Zawsze `<script setup lang="ts">`
- Props interface definiuj inline przed `defineProps`
- `usePatient()`, `useAppointments()` itp. — **nie** importuj `useAPI` bezpośrednio w dialogach; używaj feature composable
- Nie dodawaj komentarzy do kodu jeśli nie są konieczne
- Nie commituj zmian bez pytania użytkownika
- Nie instaluj paczek bez zgody użytkownika

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
