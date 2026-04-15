<script setup lang="ts">
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import type { JobPosition } from '~/types/job-position/job-position.type'

const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(
  z.object({
    name: z.string().nonempty('Nazwa jest wymagana'),
    f_name: z.string(),
    m_name: z.string(),
  }),
)

function onSubmit(values: JobPosition) {
  emit('submit', values)
}
</script>
<template>
  <Form class="px-4 py-4" :validation-schema="formSchema" @submit="onSubmit">
    <BaseInputForm
      name="name"
      label="Nazwa stanowiska"
      placeholder="Nazwa stanowiska"
      type="text"
    />

    <div class="mt-5">
      <BaseInputForm
        name="f_name"
        label="Rodzaj żeński"
        placeholder="Wpisz nazwę stanowiska z rodzajem żeńskim"
        type="text"
      />
    </div>

    <div class="mt-5">
      <BaseInputForm
        name="m_name"
        label="Rodzaj męski"
        placeholder="Wpisz nazwę stanowiska z rodzajem męskim"
        type="text"
      />
    </div>

    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')"
        >Anuluj</Button
      >
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
