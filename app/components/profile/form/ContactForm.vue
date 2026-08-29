<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { User, UserPayload } from '~/types'
import type { JobPosition } from '~/types/job-position/job-position.type'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSwitchForm from '~/components/base/form/BaseSwitchForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import BasePhoneForm from '~/components/base/form/BasePhoneForm.vue'
import { JobPositionsEndpoints } from '~/features/job-positions'
import BaseAcceptDeclineButtons from '~/components/base/buttons/BaseAcceptDeclineButtons.vue'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits(['confirm', 'cancel'])

const formRef = ref()

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
    private_email: z
      .string()
      .email('Nieprawidłowy adres email')
      .or(z.literal(''))
      .or(z.literal(null))
      .optional(),
    phone_number: z.string().nullish().optional(),
    private_phone_number: z.string().nullish().optional(),
    job_position_uuid: z.string().optional(),
    is_active: z.boolean(),
  }),
)

const initialValues = {
  first_name: props.user.first_name,
  last_name: props.user.last_name,
  pesel: props.user.pesel ?? '',
  street: props.user.street ?? '',
  house_number: props.user.house_number ?? '',
  apartment_number: props.user.apartment_number ?? '',
  postal_code: props.user.postal_code ?? '',
  city: props.user.city ?? '',
  email: props.user.email,
  private_email: props.user.private_email ?? '',
  phone_number: props.user.phone_number?.find((p) => p.type === 'WORK')?.number ?? '',
  private_phone_number: props.user.phone_number?.find((p) => p.type === 'PRIVATE')?.number ?? '',
  job_position_uuid: props.user.job_positions?.[0]?.uuid ?? '',
  is_active: props.user.is_active,
}

async function onSubmit(values: UserPayload) {
  const payload: UserPayload = {
    ...values,
  }
  emit('confirm', payload)
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
        <div class="flex flex-row gap-2">
          <BasePhoneForm name="phone_number" label="Telefon służbowy" />
          <BasePhoneForm name="private_phone_number" label="Telefon prywatny" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Informacje zawodowe
        </div>
        <BaseSelectForm
          name="job_position_uuid"
          label="Stanowisko"
          placeholder="Wybierz stanowisko"
          :api-url="JobPositionsEndpoints.LIST_SELECT"
          :option-value="(e: JobPosition) => e.uuid"
          :option-label="(e: JobPosition) => e.name"
          immediate-fetch
        />
      </div>

      <div>
        <div class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status konta
        </div>
        <BaseSwitchForm name="is_active" label="Aktywny pracownik" />
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
