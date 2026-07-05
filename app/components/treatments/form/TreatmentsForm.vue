<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { TreatmentPayload, TreatmentType } from '~/types'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseTextareaForm from '~/components/base/form/BaseTextareaForm.vue'

const props = defineProps<{
  initialValues?: TreatmentType
}>()

const emit = defineEmits<{
  submit: [values: TreatmentPayload]
  cancel: []
}>()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Nazwa jest wymagana'),
    description: z.string().optional(),
    short_description: z.string().optional(),
    price: z.coerce.number().positive('Cena musi być większa od 0'),
  }),
)

const initialFormValues = {
  name: props.initialValues?.name ?? '',
  description: props.initialValues?.description ?? '',
  short_description: props.initialValues?.short_description ?? '',
  price: props.initialValues?.price ?? 0,
}

function onSubmit(values: TreatmentPayload) {
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
    <div class="mb-4 gap-4">
      <BaseInputForm name="name" label="Nazwa" placeholder="Wpisz nazwę usługi" />
      <BaseTextareaForm name="description" label="Opis" placeholder="Wpisz opis" />
      <BaseTextareaForm
        name="short_description"
        label="Dodatkowy opis"
        placeholder="Wprowadź dodatkowy opis"
      />
      <BaseInputForm name="price" label="Cena" placeholder="Wpisz cenę" />
    </div>
    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
