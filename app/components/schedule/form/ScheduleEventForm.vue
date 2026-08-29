<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { ScheduleEvent, ScheduleEventPayload } from '~/types'
import { CalendarType } from '~/types'

interface Props {
  scheduleEvent?: ScheduleEvent
  initialValues?: ScheduleEvent
}

const props = defineProps<Props>()
const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(
  z
    .object({
      type: z.nativeEnum(CalendarType),
      date: z.string().optional(),
      start_time: z.string().optional(),
      end_time: z.string().optional(),
      date_from: z.string().optional(),
      date_to: z.string().optional(),
      notes: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === CalendarType.WORK) {
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

const seed = props.scheduleEvent ?? props.initialValues
const initialValues = {
  type: seed?.type ?? CalendarType.WORK,
  date: seed?.date ?? '',
  start_time: seed?.start_time ?? '',
  end_time: seed?.end_time ?? '',
  date_from: seed?.date_from ?? '',
  date_to: seed?.date_to ?? '',
  notes: seed?.notes ?? '',
}

function onSubmit(values: ScheduleEventPayload) {
  emit('submit', values)
}
</script>

<template>
  <Form
    v-slot="{ values }"
    class="divide-y"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <div class="px-4 py-4 space-y-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Typ wpisu</p>
      <ScheduleEventTypePicker />
    </div>

    <div v-if="values.type === CalendarType.WORK" class="px-4 py-4 space-y-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Termin</p>
      <BaseDateTimeForm name="date" size="sm" label="Data" type="date" />
      <div class="grid grid-cols-2 gap-4">
        <BaseTimePickerForm name="start_time" size="sm" label="Godzina rozpoczęcia" />
        <BaseTimePickerForm name="end_time" size="sm" label="Godzina zakończenia" />
      </div>
    </div>

    <div v-else class="px-4 py-4 space-y-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Termin</p>
      <div class="grid grid-cols-2 gap-4">
        <BaseDateTimeForm name="date_from" size="sm" label="Od" type="date" />
        <BaseDateTimeForm name="date_to" size="sm" label="Do" type="date" />
      </div>
    </div>

    <div class="px-4 py-4">
      <BaseInputForm
        name="notes"
        size="sm"
        label="Notatki (opcjonalnie)"
        placeholder="Dodaj notatkę..."
      />
    </div>

    <div class="px-4 py-3">
      <BaseAcceptDeclineButtons
        confirm-title="Zapisz"
        cancel-title="Anuluj"
        confirm-type="submit"
        @cancel="emit('cancel')"
      />
    </div>
  </Form>
</template>
