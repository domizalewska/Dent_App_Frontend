<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import BaseAcceptDeclineButtons from '~/components/base/buttons/BaseAcceptDeclineButtons.vue'
import type { EventPayload } from '~/types/event/event.types'

const formSchema = toTypedSchema(
  z
    .object({
      title: z.string().nonempty('Nazwa zdarzenia jest wymagana'),
      patient_uuid: z.string().nonempty('Pacjent jest wymagany'),
      doctor_uuid: z.string().nonempty('Lekarz jest wymagany'),
      date: z.string().nonempty('Data jest wymagana'),
      start: z.string().nonempty('Godzina rozpoczęcia jest wymagana'),
      end: z.string().nonempty('Godzina zakończenia jest wymagana'),
      notes: z.string().optional(),
    })
    .refine((data) => data.start < data.end, {
      message: 'Godzina zakończenia musi być po godzinie rozpoczęcia',
      path: ['end'],
    }),
)

const initialValues = {
  title: '',
  patient_uuid: '',
  doctor_uuid: '',
  date: '',
  start_time: '',
  end_time: '',
  notes: '',
}

function onSubmit(values: EventPayload) {
  emit('submit', values)
}
</script>

<template>
  <Form
    :validation-schema="formSchema"
    :initial-values="initialValues"
    class="divide-y"
    @submit="onSubmit"
  >
    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Zdarzenie
      </p>
      <BaseInputForm name="title" label="Nazwa zdarzenia" placeholder="Wpisz nazwę zdarzenia" />
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Uczestnicy
      </p>
      <div class="space-y-4">
        <BaseSelectForm
          name="patient_uuid"
          label="Pacjent"
          placeholder="Wybierz pacjenta"
          :api="UsersEndpoints().LIST_SELECT"
          :option-value="(e: User) => e.uuid"
          :option-label="(e: User) => `${e.first_name} ${e.last_name}`"
        />
        <BaseSelectForm
          name="doctor_uuid"
          label="Lekarz"
          placeholder="Wybierz lekarza"
          :api="UsersEndpoints().LIST_SELECT"
          :option-value="(e: User) => e.uuid"
          :option-label="(e: User) => `${e.first_name} ${e.last_name}`"
        />
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Termin</p>
      <div class="space-y-4">
        <BaseInputForm name="date" label="Data" placeholder="" type="date" />
        <div class="grid grid-cols-2 gap-4">
          <BaseInputForm name="start_time" label="Godzina rozpoczęcia" placeholder="" type="time" />
          <BaseInputForm name="end_time" label="Godzina zakończenia" placeholder="" type="time" />
        </div>
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Notatki
      </p>
      <BaseInputForm name="notes" label="Notatki" placeholder="Dodaj notatki (opcjonalnie)" />
    </div>

    <div class="flex items-center justify-end gap-3 px-4 py-3">
      <BaseAcceptDeclineButtons accept-title="Zapisz" decline-title="Anuluj" />
    </div>
  </Form>
</template>
