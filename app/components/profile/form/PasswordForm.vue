<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'

const formSchema = toTypedSchema(
  z
    .object({
      current_password: z.string().nonempty('Wpisz aktualne hasło'),
      new_password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
      confirm_password: z.string().nonempty('Powtórz nowe hasło'),
    })
    .refine((data) => data.new_password === data.confirm_password, {
      message: 'Hasła nie są identyczne',
      path: ['confirm_password'],
    }),
)

const onSubmit = (values: Record<string, unknown>) => {
  console.log(values)
}
</script>

<template>
  <Form class="px-4 py-4" :validation-schema="formSchema" @submit="onSubmit">
    <BaseInputForm
      name="current_password"
      label="Aktualne hasło"
      placeholder="Wpisz aktualne hasło"
      type="password"
    />

    <div class="my-5 border-t" />

    <BaseInputForm
      name="new_password"
      label="Nowe hasło"
      placeholder="Utwórz silne hasło"
      type="password"
    />

    <div class="mt-5">
      <BaseInputForm
        name="confirm_password"
        label="Powtórz nowe hasło"
        placeholder="Wpisz ponownie nowe hasło"
        type="password"
      />
    </div>

    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button">Anuluj</Button>
      <Button size="sm" type="submit" class="min-w-[140px]">Zaktualizuj hasło</Button>
    </div>
  </Form>
</template>
