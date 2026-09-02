<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { AppointmentPayload, AppointmentType } from '~/types'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import BaseTextareaForm from '~/components/base/form/BaseTextareaForm.vue'
import { RoomsEndpoints } from '~/features/rooms'
import { UsersEndpoints } from '~/features/users'
import { PatientsEndpoints } from '~/features/patients'
import { TreatmentsEndpoints } from '~/features/treatments'
import type { RoomType, User, PatientType, TreatmentType } from '~/types'

interface Props {
  date: string
  initialValues?: AppointmentType
}

const props = defineProps<Props>()

const formInitialValues = computed(() =>
  props.initialValues
    ? {
        room_uuid: props.initialValues.room.uuid,
        patient_uuid: props.initialValues.patient.uuid,
        doctor_uuid: props.initialValues.doctor.uuid,
        treatment_uuid: props.initialValues.treatment.uuid,
        start: props.initialValues.start_date.slice(11, 16),
        end: props.initialValues.end_date.slice(11, 16),
        description: props.initialValues.description,
      }
    : undefined,
)

const emit = defineEmits<{
  submit: [values: AppointmentPayload]
  cancel: []
}>()

const formSchema = toTypedSchema(
  z.object({
    room_uuid: z.string().nonempty('Gabinet jest wymagany'),
    patient_uuid: z.string().nonempty('Pacjent jest wymagany'),
    doctor_uuid: z.string().nonempty('Lekarz jest wymagany'),
    treatment_uuid: z.string().nonempty('Usługa jest wymagana'),
    start: z.string().nonempty('Godzina rozpoczęcia jest wymagana'),
    end: z.string().nonempty('Godzina zakończenia jest wymagana'),
    description: z.string().optional(),
  }),
)

function onSubmit(values: Omit<AppointmentPayload, 'date'>) {
  emit('submit', { ...values, date: props.date })
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
        name="room_uuid"
        label="Gabinet"
        :api-url="RoomsEndpoints.BASE"
        :option-value="(r: RoomType) => r.uuid"
        :option-label="(r: RoomType) => r.name"
      />
      <BaseSelectForm
        name="patient_uuid"
        label="Pacjent"
        :api-url="PatientsEndpoints.LIST_SELECT"
        :option-value="(p: PatientType) => p.uuid"
        :option-label="(p: PatientType) => `${p.first_name} ${p.last_name}`"
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
        <BaseInputForm name="start" label="Godzina rozpoczęcia" placeholder="" type="time" />
        <BaseInputForm name="end" label="Godzina zakończenia" placeholder="" type="time" />
      </div>
      <BaseTextareaForm name="description" label="Uwagi" placeholder="Opcjonalne uwagi..." />
    </div>
    <div class="flex items-center justify-end gap-3 px-4 py-3">
      <Button variant="ghost" size="sm" type="button" @click="emit('cancel')">Anuluj</Button>
      <Button size="sm" type="submit" class="min-w-[140px]">Zapisz wizytę</Button>
    </div>
  </Form>
</template>
