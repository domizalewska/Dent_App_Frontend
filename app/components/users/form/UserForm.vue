<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { User, UserPayload } from '~/types'
import type { JobPosition } from '~/types/job-position/job-position.type'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSwitchForm from '~/components/base/form/BaseSwitchForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import { JobPositionsEndpoints } from '~/features/job-positions'

const props = defineProps<{
  initialValues?: User
}>()

const emit = defineEmits<{
  submit: [values: UserPayload]
  cancel: []
}>()

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().nonempty('Imię jest wymagane'),
    last_name: z.string().nonempty('Nazwisko jest wymagane'),
    email: z.string().email('Nieprawidłowy adres email'),
    pesel: z.string().nonempty('Pesel jest wymagane'),
    private_email: z.string().email('Nieprawidłowy adres email').or(z.literal('')).optional(),
    phone_number: z.string().optional(),
    private_phone_number: z.string().optional(),
    job_position_uuid: z.string().optional(),
    pwz_number: z.string().optional(),
    is_active: z.boolean(),
  }),
)

const initialFormValues = {
  first_name: props.initialValues?.first_name ?? '',
  last_name: props.initialValues?.last_name ?? '',
  email: props.initialValues?.email ?? '',
  pesel: props.initialValues?.pesel ?? '',
  private_email: props.initialValues?.private_email ?? '',
  phone_number: props.initialValues?.phone_number ?? '',
  private_phone_number: props.initialValues?.private_phone_number ?? '',
  job_position_uuid: props.initialValues?.job_position?.uuid ?? '',
  pwz_number: props.initialValues?.pwz_number ?? '',
  is_active: props.initialValues?.is_active ?? true,
}

function onSubmit(values: UserPayload) {
  emit('submit', values)
}
</script>

<template>
  <Form
    class="px-4 py-4"
    :validation-schema="formSchema"
    :initial-values="initialFormValues"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-2 gap-4">
      <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" />
      <BaseInputForm name="last_name" label="Nazwisko" placeholder="Wpisz nazwisko" />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <BaseInputForm
        name="email"
        label="Email służbowy"
        placeholder="Wpisz email służbowy"
        type="email"
      />
      <BaseInputForm
        name="private_email"
        label="Email prywatny"
        placeholder="Wpisz email prywatny"
        type="email"
      />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <BaseInputForm
        name="phone_number"
        label="Telefon służbowy"
        placeholder="Wpisz telefon służbowy"
        type="tel"
      />
      <BaseInputForm
        name="private_phone_number"
        label="Telefon prywatny"
        placeholder="Wpisz telefon prywatny"
        type="tel"
      />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <BaseSelectForm
        name="job_position_uuid"
        label="Stanowisko"
        placeholder="Wybierz stanowisko"
        :api-url="JobPositionsEndpoints.LIST_SELECT"
        :option-value="(e: JobPosition) => e.uuid"
        :option-label="(e: JobPosition) => e.name"
      />
      <BaseInputForm name="pwz_number" label="Numer PWZ" placeholder="Wpisz numer PWZ" />
    </div>

    <div class="mt-4">
      <BaseInputForm name="pesel" label="Pesel" placeholder="Wpisz numer pesel" />
      <BaseSwitchForm name="is_active" label="Aktywny pracownik" />
    </div>

    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
