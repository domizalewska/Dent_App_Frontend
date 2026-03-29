<script setup lang="ts">
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
const email = ref('')
const password = ref('')


const onSubmit = async () => {
  await loginUser({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl">
    <CardHeader class="text-center items-center">
      <CardTitle class="flex text-xl pt-6">Login</CardTitle>
      <CardDescription class="flex text-xs pb-3">Wprowadź swoje dane logowania</CardDescription>
    </CardHeader>

    <CardContent>
      <Form ref="formRef" as="form" @submit="onSubmit">
        <FieldGroup>
          <div class="mb-4">
            <FieldLabel>Email</FieldLabel>
            <Input v-model="email" placeholder="Email" />
          </div>

          <div class="mb-4">
            <FieldLabel>Password</FieldLabel>
            <Input v-model="password" type="password" placeholder="Hasło" />
          </div>

          <CardFooter class="flex flex-col mt-4">
            <Button class="w-full mb-4" type="submit">Zaloguj się</Button>
            <FieldDescription class="text-center">
              Nie posiadasz konta?
              <a href="#"> Zarejestruj się </a>
            </FieldDescription>
          </CardFooter>
        </FieldGroup>
      </Form>
    </CardContent>
  </Card>
</template>
