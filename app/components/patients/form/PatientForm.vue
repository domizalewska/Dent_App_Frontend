<script setup lang="ts">
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { Patient, PatientPayload } from '~/types'
import BasePhoneForm from '~/components/base/form/BasePhoneForm.vue'
import BaseAcceptDeclineButtons from '~/components/base/buttons/BaseAcceptDeclineButtons.vue'

interface Props {
  patient: Patient
}

const props = defineProps<Props>()

const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().nonempty('Imię jest wymagane'),
    last_name: z.string().nonempty('Nazwisko jest wymagane'),
    pesel: z
      .string()
      .regex(/^\d{11}$/, 'PESEL musi mieć 11 cyfr')
      .or(z.literal(''))
      .optional(),
    street: z.string().optional(),
    house_number: z.string().optional(),
    apartment_number: z.string().optional(),
    postal_code: z
      .string()
      .regex(/^\d{2}-\d{3}$/, 'Format: __-___')
      .or(z.literal(''))
      .optional(),
    city: z.string().optional(),
    email: z.string().email('Nieprawidłowy adres email'),
    phone_number: z.string().nullish().optional(),
  }),
)

const initialValues = {
  first_name: props.patient.first_name,
  last_name: props.patient.last_name,
  pesel: props.patient.pesel ?? '',
  street: props.patient.street ?? '',
  house_number: props.patient.house_number ?? '',
  apartment_number: props.patient.apartment_number ?? '',
  postal_code: props.patient.postal_code ?? '',
  city: props.patient.city ?? '',
  email: props.patient.email,
  phone_number: props.patient.phone_number ?? '',
}

function onSubmit(values: PatientPayload) {
  const payload: PatientPayload = {
    ...values,
  }
  emit('submit', payload)
}
</script>

<template>
  <Form
    ref="formRef"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    class="flex flex-1 flex-col min-h-0 overflow-hidden"
    @submit="onSubmit"
  >
    <div class="flex-1 overflow-y-auto min-h-0 px-3 py-4 flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Informacje ogólne
        </div>
        <div class="flex flex-row gap-2">
          <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" />
          <BaseInputForm name="last_name" label="Nazwisko" placeholder="Wpisz nazwisko" />
        </div>
        <div class="flex flex-row gap-2 w-1/2">
          <BaseInputForm
            name="pesel"
            label="PESEL"
            placeholder="_ _ _ _ _ _ _ _ _ _ _"
            mask="###########"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Adres</div>
        <div class="flex flex-row gap-2">
          <BaseInputForm
            name="street"
            label="Ulica"
            placeholder="Wpisz ulicę"
            class="text-accent-foreground"
          />
          <BaseInputForm name="city" label="Miejscowość" placeholder="Wpisz miejscowość" />
        </div>
        <div class="flex flex-row gap-2">
          <BaseInputForm name="house_number" label="Nr domu" placeholder="Nr domu" />
          <BaseInputForm
            name="apartment_number"
            label="Nr mieszkania"
            placeholder="Nr mieszkania"
          />
        </div>
        <div class="flex flex-row gap-2 w-1/2">
          <BaseInputForm
            name="postal_code"
            label="Kod pocztowy"
            placeholder="__-___"
            mask="##-###"
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Kontakt
        </div>
        <div class="flex flex-row gap-2">
          <BaseInputForm name="email" label="Email" placeholder="Wpisz email" type="email" />
          <BasePhoneForm name="phone_number" label="Telefon służbowy" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Informacje dodatkowe
        </div>
        <div class="flex flex-row gap-2"></div>
      </div>
    </div>

    <div class="border-t px-3 py-3">
      <BaseAcceptDeclineButtons
        confirm-title="Zapisz"
        cancel-title="Anuluj"
        confirm-type="submit"
        @cancel="emit('cancel')"
      />
    </div>
  </Form>
</template>
