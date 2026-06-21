<script setup lang="ts">
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { PatientPayload } from '~/types'

interface Props {
  patient?: PatientPayload
}

defineProps<Props>()

const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().nonempty('Imię jest wymagane'),
    last_name: z.string().nonempty('Nazwisko jest wymagane'),
    email: z.string().email('Nieprawidłowy adres email').optional().or(z.literal('')),
    pesel: z
      .string()
      .length(11, 'PESEL musi mieć 11 cyfr')
      .regex(/^\d{11}$/, 'PESEL może zawierać tylko cyfry')
      .nonempty()
      .or(z.literal('')),
    address: z.string().optional().or(z.literal('')),
    phone: z
      .string()
      .regex(/^\+?[\d\s\-]{9,15}$/, 'Nieprawidłowy numer telefonu')
      .optional()
      .or(z.literal('')),
    nip: z.string().optional().or(z.literal('')),
  }),
)

function onSubmit(values: PatientPayload) {
  emit('submit', values)
}
</script>

<template>
  <Form
    class="px-4 py-4"
    :validation-schema="formSchema"
    :initial-values="{ ...patient }"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-2 gap-4">
      <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" type="text" required />
      <BaseInputForm
        name="last_name"
        label="Nazwisko"
        placeholder="Wpisz nazwisko"
        type="text"
        required
      />
    </div>

    <div class="mt-4">
      <BaseInputForm name="email" label="Email" placeholder="Wpisz adres email" type="email" />
    </div>

    <div class="mt-4">
      <BaseInputForm
        name="phone"
        label="Numer telefonu"
        placeholder="Wpisz numer telefonu"
        type="tel"
      />
    </div>

    <div class="mt-4">
      <BaseInputForm
        name="pesel"
        label="PESEL"
        placeholder="Wpisz numer PESEL"
        type="text"
        required
      />
    </div>

    <div class="mt-4">
      <BaseInputForm name="address" label="Adres" placeholder="Wpisz adres" type="text" />
    </div>

    <div class="mt-4">
      <BaseInputForm name="nip" label="NIP" placeholder="Wpisz numer nip" type="text" />
    </div>

    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
