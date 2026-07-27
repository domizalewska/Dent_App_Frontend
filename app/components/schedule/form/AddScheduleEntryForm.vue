<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { BriefcaseMedicalIcon, PalmtreeIcon, ThermometerIcon } from 'lucide-vue-next'
import type { ScheduleEntryFormValues, ScheduleEntryKind, ScheduleEntryPayload } from '~/types'

interface Props {
  prefill?: Partial<ScheduleEntryFormValues>
}

const props = defineProps<Props>()
const emit = defineEmits<{ submit: [payload: ScheduleEntryPayload] }>()

const kindOptions: { value: ScheduleEntryKind; label: string; icon: Component; color: string }[] = [
  { value: 'work', label: 'Praca', icon: BriefcaseMedicalIcon, color: 'text-indigo-500' },
  { value: 'vacation', label: 'Urlop', icon: PalmtreeIcon, color: 'text-amber-500' },
  { value: 'sick_leave', label: 'L4', icon: ThermometerIcon, color: 'text-red-500' },
]

const schema = toTypedSchema(
  z
    .object({
      kind: z.enum(['work', 'sick_leave', 'vacation']),
      date: z.string().optional(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
      date_from: z.string().optional(),
      date_to: z.string().optional(),
      notes: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.kind === 'work') {
        if (!data.date) ctx.addIssue({ code: 'custom', message: 'Wymagane', path: ['date'] })
        if (!data.start_time)
          ctx.addIssue({ code: 'custom', message: 'Wymagane', path: ['start_time'] })
        if (!data.end_time)
          ctx.addIssue({ code: 'custom', message: 'Wymagane', path: ['end_time'] })
        if (data.start_time && data.end_time && data.start_time >= data.end_time)
          ctx.addIssue({
            code: 'custom',
            message: 'Musi być po godzinie rozpoczęcia',
            path: ['end_time'],
          })
      } else {
        if (!data.date_from)
          ctx.addIssue({ code: 'custom', message: 'Wymagane', path: ['date_from'] })
        if (!data.date_to) ctx.addIssue({ code: 'custom', message: 'Wymagane', path: ['date_to'] })
        if (data.date_from && data.date_to && data.date_from > data.date_to)
          ctx.addIssue({
            code: 'custom',
            message: 'Musi być po dacie początkowej',
            path: ['date_to'],
          })
      }
    }),
)

const { handleSubmit, values, setFieldValue } = useForm<ScheduleEntryFormValues>({
  validationSchema: schema,
  initialValues: {
    kind: props.prefill?.kind ?? 'work',
    date: props.prefill?.date ?? '',
    start_time: props.prefill?.start_time ?? undefined,
    end_time: props.prefill?.end_time ?? undefined,
    date_from: props.prefill?.date_from ?? '',
    date_to: props.prefill?.date_to ?? '',
    notes: props.prefill?.notes ?? '',
  },
})

const onSubmit = handleSubmit((vals) => {
  let payload: ScheduleEntryPayload

  if (vals.kind === 'work') {
    payload = {
      kind: 'work',
      start: `${vals.date}T${vals.start_time}:00`,
      end: `${vals.date}T${vals.end_time}:00`,
      notes: vals.notes || undefined,
    }
  } else {
    const endDate = new Date(vals.date_to!)
    endDate.setDate(endDate.getDate() + 1)
    payload = {
      kind: vals.kind,
      start: vals.date_from!,
      end: endDate.toISOString().slice(0, 10),
      notes: vals.notes || undefined,
    }
  }

  emit('submit', payload)
})
</script>

<template>
  <form class="divide-y" @submit.prevent="onSubmit">
    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Typ wpisu
      </p>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="opt in kindOptions"
          :key="opt.value"
          type="button"
          class="flex flex-col items-center gap-1.5 rounded-lg border p-3 text-sm font-medium transition-colors"
          :class="
            values.kind === opt.value
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-border text-muted-foreground hover:bg-accent'
          "
          @click="setFieldValue('kind', opt.value)"
        >
          <component
            :is="opt.icon"
            class="size-5"
            :class="values.kind === opt.value ? '' : opt.color"
          />
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div v-if="values.kind === 'work'" class="px-4 py-4 space-y-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Termin</p>
      <BaseDateTimeForm name="date" label="Data" type="date" />
      <div class="grid grid-cols-2 gap-4">
        <BaseTimePickerForm name="start_time" label="Godzina rozpoczęcia" />
        <BaseTimePickerForm name="end_time" label="Godzina zakończenia" />
      </div>
    </div>

    <div v-else class="px-4 py-4 space-y-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Okres</p>
      <div class="grid grid-cols-2 gap-4">
        <BaseDateTimeForm name="date_from" label="Od" type="date" />
        <BaseDateTimeForm name="date_to" label="Do" type="date" />
      </div>
    </div>

    <div class="px-4 py-4 space-y-1">
      <Label>Notatki <span class="text-muted-foreground font-normal">(opcjonalnie)</span></Label>
      <Input
        :value="values.notes"
        placeholder="Dodaj notatkę..."
        @input="(e: Event) => setFieldValue('notes', (e.target as HTMLInputElement).value)"
      />
    </div>

    <div class="flex justify-end gap-2 px-4 py-3">
      <Button type="submit">Zapisz</Button>
    </div>
  </form>
</template>
