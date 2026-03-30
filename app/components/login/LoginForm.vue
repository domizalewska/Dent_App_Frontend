<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as VeeField, useForm } from 'vee-validate'
import { z } from 'zod'

import { useAuth } from '~/composables/useAuth'
import type { LoginPayload } from '~/types'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'

const { loginUser } = useAuth()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Niepoprawny email'),
    password: z.string().nonempty('Wprowadź swoje hasło'),
  }),
)

const { handleSubmit } = useForm<LoginPayload>({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  await loginUser(values)
})
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl max-w-md mx-auto">
    <CardHeader class="text-center items-center">
      <CardTitle class="text-xl pt-6">Login</CardTitle>
      <CardDescription class="text-xs pb-3"> Wprowadź swoje dane logowania </CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit="onSubmit">
        <FieldGroup>
          <VeeField v-slot="{ field, errors }" name="email">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Email</FieldLabel>

              <Input
                v-bind="field"
                type="email"
                placeholder="Email"
                :aria-invalid="!!errors.length"
              />

              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="password">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Hasło</FieldLabel>

              <Input
                v-bind="field"
                type="password"
                placeholder="Hasło"
                :aria-invalid="!!errors.length"
              />

              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
        </FieldGroup>

        <CardFooter class="flex flex-col mt-4">
          <Button class="w-full mb-4" type="submit"> Zaloguj się </Button>

          <FieldDescription class="text-center">
            Nie posiadasz konta?
            <NuxtLink to="/forgot-password">
              <div class="text-sm hover:underline text-color focus:outline-none">
                <span>Zarejestruj się </span>
              </div>
            </NuxtLink>
          </FieldDescription>
        </CardFooter>
      </form>
    </CardContent>
  </Card>
</template>
