<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import BaseTextareaForm from '~/components/base/form/BaseTextareaForm.vue'
import { UsersEndpoints } from '~/features/users'
import { PatientsEndpoints } from '~/features/patients'
import { TreatmentsEndpoints } from '~/features/treatments'
import type { CalendarEventPayload, CalendarEventType, Patient, TreatmentType, User } from '~/types'

interface Props {
  date: string
  initialValues?: CalendarEventType
}

const props = defineProps<Props>()

const formInitialValues = computed(() =>
  props.initialValues
    ? {
        patient_uuid: props.initialValues.patients[0]?.uuid,
        doctor_uuid: props.initialValues.users[0]?.uuid,
        treatment_uuid: props.initialValues.treatment?.uuid,
        start_time: props.initialValues.start_time?.slice(0, 5),
        end_time: props.initialValues.end_time?.slice(0, 5),
        description: props.initialValues.description,
      }
    : undefined,
)

const emit = defineEmits<{
  submit: [values: CalendarEventPayload]
  cancel: []
}>()

const formSchema = toTypedSchema(
  z.object({
    patient_uuid: z.string().nonempty('Pacjent jest wymagany'),
    doctor_uuid: z.string().nonempty('Lekarz jest wymagany'),
    treatment_uuid: z.string().nonempty('Usługa jest wymagana'),
    start_time: z.string().nonempty('Godzina rozpoczęcia jest wymagana'),
    end_time: z.string().nonempty('Godzina zakończenia jest wymagana'),
    description: z.string().optional(),
  }),
)

function onSubmit(values: Omit<CalendarEventPayload, 'date' | 'type'>) {
  emit('submit', { ...values, date: props.date, type: 'EXAMINATION' })
}
</script>

<template>
  <Form
    class="divide-y"
    :validation-schema="formSchema"
    :initial-values="formInitialValues"
    @submit="onSubmit"
  >
    <div class="px-4 py-4 flex flex-col gap-4">
      <BaseSelectForm
        name="patient_uuid"
        label="Pacjent"
        :api-url="PatientsEndpoints.LIST_SELECT"
        :option-value="(p: Patient) => p.uuid"
        :option-label="(p: Patient) => `${p.first_name} ${p.last_name}`"
        immediate-fetch
      />
      <BaseSelectForm
        name="doctor_uuid"
        label="Lekarz"
        :api-url="UsersEndpoints.LIST_SELECT"
        :option-value="(u: User) => u.uuid"
        :option-label="(u: User) => `${u.first_name} ${u.last_name}`"
      />
      <BaseSelectForm
        name="treatment_uuid"
        label="Usługa"
        :api-url="TreatmentsEndpoints.LIST_SELECT"
        :option-value="(t: TreatmentType) => t.uuid"
        :option-label="(t: TreatmentType) => t.name"
      />
    </div>
    <div class="px-4 py-4 flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <BaseTimePickerForm name="start_time" label="Godzina rozpoczęcia" />
        <BaseTimePickerForm name="end_time" label="Godzina zakończenia" />
      </div>
      <BaseTextareaForm name="description" label="Uwagi" placeholder="Opcjonalne uwagi..." />
    </div>
    <div class="flex items-center justify-end gap-3 px-4 py-3">
      <Button variant="ghost" size="sm" type="button" @click="emit('cancel')">Anuluj</Button>
      <Button size="sm" type="submit" class="min-w-[140px]">Zapisz wizytę</Button>
    </div>
  </Form>
</template>
