<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field as VeeField, useForm } from 'vee-validate'
import { z } from 'zod'

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
import { Field, FieldError, FieldGroup, FieldLabel } from '~/components/ui/field'
import { useAPI } from '~/composables/useAPI'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Niepoprawny email'),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
  },
})

const onSubmit = handleSubmit(async (values) => {
  await useAPI('/forgot-password', {
    method: 'POST',
    body: values,
  })
  await router.push('forgot-password/detail')
})
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl max-w-md mx-auto">
    <CardHeader class="text-center items-center">
      <CardTitle class="text-xl pt-6">Reset Hasła</CardTitle>
      <CardDescription class="text-xs pb-3">
        Podaj adres e-mail, a wyślemy ci link do zresetowania hasła.
      </CardDescription>
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
        </FieldGroup>

        <CardFooter class="flex flex-col mt-4">
          <Button class="w-full mb-4" type="submit"> Zresetuj hasło </Button>

          <NuxtLink to="/login">
            <div class="text-sm hover:underline text-color focus:outline-none">
              <span>Zaloguj się</span>
            </div>
          </NuxtLink>
        </CardFooter>
      </form>
    </CardContent>
  </Card>
</template>
