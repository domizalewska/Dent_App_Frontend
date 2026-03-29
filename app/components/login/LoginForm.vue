<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
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
import { FieldGroup, FieldLabel } from '~/components/ui/field'
import { useAuth } from '~/composables/useAuth'

const { loginUser } = useAuth()
const formRef = ref('')

const schema = toTypedSchema(
  z.object({
    email: z.string().nonempty('Email jest wymagany').email('Nieprawidłowy email'),
    password: z.string().min(6, 'Hasło musi mieć min. 6 znaków'),
  }),
)

const { handleSubmit } = useForm({ validationSchema: schema })

const onSubmit = handleSubmit((values) => {
  loginUser(values)
})
</script>

<template>
  <Card class="w-full sm:max-w-md mx-auto mt-10">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Wprowadź swoje dane logowania</CardDescription>
    </CardHeader>

    <CardContent>
      <Form ref="formRef" @submit="onSubmit">
        <FieldGroup>
          <div class="mb-4">
            <FieldLabel>Email</FieldLabel>
            <Input name="email" placeholder="Email" />
          </div>

          <div class="mb-4">
            <FieldLabel>Password</FieldLabel>
            <Input name="password" type="password" placeholder="Hasło" />
          </div>

          <CardFooter class="w-full mt-4">
            <Button type="submit">Zaloguj się</Button>
          </CardFooter>
        </FieldGroup>
      </Form>
    </CardContent>
  </Card>
</template>
