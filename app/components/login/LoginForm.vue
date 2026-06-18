<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import { useAuth } from '~/composables/useAuth'
import type { LoginPayload } from '~/types'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { FieldDescription } from '~/components/ui/field'
import { Alert, AlertDescription } from '~/components/ui/alert'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'

const { loginUser } = useAuth()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Niepoprawny email'),
    password: z.string().nonempty('Wprowadź swoje hasło'),
  }),
)

const serverError = ref('')

const initialValues = {
  email: '',
  password: '',
}

const onSubmit = async (values: LoginPayload) => {
  serverError.value = ''
  try {
    await loginUser(values)
  } catch (error: unknown) {
    serverError.value = (error as Error)?.message ?? 'Nieprawidłowy mail lub hasło.'
  }
}
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl">
    <CardHeader class="text-center items-center">
      <CardTitle class="text-xl pt-6">Login</CardTitle>
      <CardDescription class="text-xs pb-3"> Wprowadź swoje dane logowania </CardDescription>
    </CardHeader>

    <CardContent>
      <Form :validation-schema="formSchema" :initial-values="initialValues" @submit="onSubmit">
        <div class="flex flex-col justify-center align-center mb-4">
          <BaseInputForm name="email" label="E-mail" placeholder="Wpisz swoj mail" type="text" />
        </div>

        <div class="flex flex-col justify-center align-center">
          <BaseInputForm
            name="password"
            label="Hasło"
            placeholder="Wpisz swoje hasło"
            type="password"
          />
        </div>

        <Alert v-if="serverError" variant="destructive" class="mt-6">
          <AlertDescription>{{ serverError }}</AlertDescription>
        </Alert>

        <CardFooter class="flex flex-col mt-8">
          <Button class="w-full mb-4" type="submit"> Zaloguj się </Button>

          <FieldDescription class="text-center mt-8">
            Nie pamiętasz hasła?
            <NuxtLink to="/forgot-password">
              <div class="text-sm hover:underline text-color focus:outline-none">
                <span>Resetuj hasło </span>
              </div>
            </NuxtLink>
          </FieldDescription>
        </CardFooter>
      </Form>
    </CardContent>
  </Card>
</template>
