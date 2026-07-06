<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import { UsersEndpoints } from '~/features/users'
import { toast } from 'vue-sonner'
import type { PasswordPayload } from '~/types'

const { $api } = useNuxtApp()

const { logoutUser } = useAuth()

const formSchema = toTypedSchema(
  z
    .object({
      current_password: z.string().nonempty('Wpisz aktualne hasło'),
      password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
      password_confirmation: z.string().nonempty('Powtórz nowe hasło'),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Hasła nie są identyczne',
      path: ['password_confirmation'],
    }),
)

async function onSubmit(values: PasswordPayload) {
  try {
    await $api(UsersEndpoints.USER_EDIT_PASSWORD, {
      method: 'PATCH',
      body: values,
    })
    toast('Sukces!', {
      description: 'Poprawnie zmieniono hasło',
      style: toastSuccessStyle,
      duration: 1500,
    })
    setTimeout(logoutUser, 1500)
  } catch {
    toast('Błąd!', {
      description: 'Wystąpił błąd podczas resetowania hasła',
      style: toastErrorStyle,
      duration: 1500,
    })
  }
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
      name="password"
      label="Nowe hasło"
      placeholder="Utwórz silne hasło"
      type="password"
    />

    <div class="mt-5">
      <BaseInputForm
        name="password_confirmation"
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
