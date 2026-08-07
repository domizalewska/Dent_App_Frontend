<script setup lang="ts">
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Field, Form } from 'vee-validate'
import type { PatientType } from '~/types'

const props = defineProps<{
  initialValues?: Partial<PatientType>
}>()

const emit = defineEmits(['submit', 'cancel'])

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
const INSURANCE_TYPES = ['NFZ', 'Prywatne', 'Brak']

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().nonempty('Imię jest wymagane'),
    last_name: z.string().nonempty('Nazwisko jest wymagane'),
    email: z.string().email('Nieprawidłowy adres email').optional().or(z.literal('')),
    pesel: z
      .string()
      .length(11, 'PESEL musi mieć 11 cyfr')
      .regex(/^\d{11}$/, 'PESEL może zawierać tylko cyfry')
      .optional()
      .or(z.literal('')),
    address: z.string().optional().or(z.literal('')),
    phone: z
      .string()
      .regex(/^\+?[\d\s\-]{9,15}$/, 'Nieprawidłowy numer telefonu')
      .optional()
      .or(z.literal('')),
    insurance: z.enum(['NFZ', 'Prywatne', 'Brak']).optional(),
    blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  }),
)

function onSubmit(values: Partial<PatientType>) {
  emit('submit', values)
}
</script>

<template>
  <Form
    class="px-4 py-4"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <div class="grid grid-cols-2 gap-4">
      <BaseInputForm name="first_name" label="Imię" placeholder="Wpisz imię" type="text" />
      <BaseInputForm name="last_name" label="Nazwisko" placeholder="Wpisz nazwisko" type="text" />
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
      <BaseInputForm name="pesel" label="PESEL" placeholder="Wpisz numer PESEL" type="text" />
    </div>

    <div class="mt-4">
      <BaseInputForm name="address" label="Adres" placeholder="Wpisz adres" type="text" />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <Field v-slot="{ value, handleChange, errorMessage }" name="insurance">
        <div class="space-y-1.5">
          <Label class="px-2 text-xs font-medium text-muted-foreground">Ubezpieczenie</Label>
          <Select :model-value="value" @update:model-value="handleChange">
            <SelectTrigger class="w-full rounded-md">
              <SelectValue placeholder="Wybierz..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="type in INSURANCE_TYPES" :key="type" :value="type">
                {{ type }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
        </div>
      </Field>

      <Field v-slot="{ value, handleChange, errorMessage }" name="blood_group">
        <div class="space-y-1.5">
          <Label class="px-2 text-xs font-medium text-muted-foreground">Grupa krwi</Label>
          <Select :model-value="value" @update:model-value="handleChange">
            <SelectTrigger class="w-full rounded-md">
              <SelectValue placeholder="Wybierz..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="group in BLOOD_GROUPS" :key="group" :value="group">
                {{ group }}
              </SelectItem>
            </SelectContent>
          </Select>
          <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
        </div>
      </Field>
    </div>

    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
