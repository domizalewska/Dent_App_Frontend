<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { useAPI } from '~/composables/useAPI'
import { UsersEndpoints } from '~/features/users'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email('Niepoprawny email'),
  }),
)

const initialValues = {
  email: '',
}

async function onSubmit(values: FormData) {
  await useAPI(`${UsersEndpoints().LIST}/forgot-password`, {
    method: 'POST',
    body: values,
  })
  await router.push('forgot-password/detail')
}
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
      <Form :validation-schema="formSchema" :initial-values="initialValues" @submit="onSubmit">
        <BaseInputForm
          name="email"
          label="E-mail"
          placeholder="Wpisz adres e-mail do odzyskania hasła"
        />

        <CardFooter class="flex flex-col mt-4">
          <Button class="w-full mb-4" type="submit"> Zresetuj hasło </Button>

          <NuxtLink to="/login">
            <div class="text-sm hover:underline text-color focus:outline-none">
              <span>Zaloguj się</span>
            </div>
          </NuxtLink>
        </CardFooter>
      </Form>
    </CardContent>
  </Card>
</template>
