<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import type { User, UserPayload } from '~/types'
import type { JobPosition } from '~/types/job-position/job-position.type'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSwitchForm from '~/components/base/form/BaseSwitchForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import { JobPositionsEndpoints } from '~/features/job-positions'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submitted: []
  cancelled: []
}>()

const { editProfile } = useProfile(props.user.uuid)

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().nonempty('Imię jest wymagane'),
    last_name: z.string().nonempty('Nazwisko jest wymagane'),
    pesel: z.string().regex(/^\d{11}$/, 'PESEL musi mieć 11 cyfr'),
    street: z.string().nonempty('Ulica jest wymagana'),
    house_number: z.string().nonempty('Numer domu jest wymagany'),
    apartment_number: z.string().optional(),
    postal_code: z.string().regex(/^\d{2}-\d{3}$/, 'Format: NN-NNN'),
    city: z.string().nonempty('Miejscowość jest wymagana'),
    email: z.string().email('Nieprawidłowy adres email'),
    private_email: z.string().email('Nieprawidłowy adres email').or(z.literal('')).optional(),
    phone_number: z.string().optional(),
    private_phone_number: z.string().optional(),
    job_position_uuid: z.string().optional(),
    pwz_number: z.string().optional(),
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
  phone_number: props.user.phone_number,
  private_phone_number: props.user.private_phone_number ?? '',
  job_position_uuid: props.user.job_position?.uuid ?? '',
  pwz_number: props.user.pwz_number ?? '',
  is_active: props.user.is_active,
}

async function onSubmit(values: UserPayload) {
  await editProfile(values)
  emit('submitted')
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
        Dane podstawowe
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
        <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" />
        <BaseInputForm name="last_name" label="Nazwisko" placeholder="Wpisz nazwisko" />
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Adres</p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr_1fr] mb-4">
        <BaseInputForm name="street" label="Ulica" placeholder="Wpisz ulicę" />
        <BaseInputForm name="house_number" label="Nr domu" placeholder="Nr domu" />
        <BaseInputForm name="apartment_number" label="Nr mieszkania" placeholder="Nr mieszkania" />
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_2fr]">
        <BaseInputForm name="postal_code" label="Kod pocztowy" placeholder="NN-NNN" />
        <BaseInputForm name="city" label="Miejscowość" placeholder="Wpisz miejscowość" />
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Kontakt
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
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
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BaseInputForm
          name="phone_number"
          label="Telefon służbowy"
          placeholder="Wpisz służbowy numer telefonu"
          type="tel"
        />
        <BaseInputForm
          name="private_phone_number"
          label="Telefon prywatny"
          placeholder="Wpisz prywatny numer telefonu"
          type="tel"
        />
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Informacje zawodowe
      </p>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BaseSelectForm
          name="job_position_uuid"
          label="Stanowisko"
          placeholder="Wybierz stanowisko"
          :api="JobPositionsEndpoints.LIST_SELECT"
          :option-value="(e: JobPosition) => e.uuid"
          :option-label="(e: JobPosition) => e.name"
        />
        <BaseInputForm name="pwz_number" label="Numer PWZ" placeholder="Wpisz numer PWZ" />
      </div>
    </div>

    <div class="px-4 py-4">
      <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Status konta
      </p>
      <BaseSwitchForm name="is_active" label="Aktywny pracownik" />
    </div>

    <div class="flex items-center justify-end gap-3 px-4 py-3">
      <Button variant="ghost" size="sm" type="reset" class="rounded-lg" @click="emit('cancelled')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz zmiany</Button>
    </div>
  </Form>
</template>
