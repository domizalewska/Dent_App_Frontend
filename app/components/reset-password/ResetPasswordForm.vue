<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { FieldGroup, FieldLabel } from '~/components/ui/field';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useForm, Field as VeeField } from 'vee-validate';
import { toast } from 'vue-sonner';

const formSchema = toTypedSchema(
  z.object({
    password: z
      .string()
      .min(5, 'Hasło musi posiadać minimum 5 znaków')
      .max(32, 'Hasło maksymalnie może posiadasć 32 znaki'),
    reset_password: z
      .string()
      .min(5, 'Hasło musi posiadać minimum 5 znaków')
      .max(32, 'Hasło maksymalnie może posiadasć 32 znaki'),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    password: '',
    reset_password: '',
  },
});

const onSubmit = handleSubmit(
  (data) => {
    toast('Sukces!', {
      description: 'Prawidłowo zresetowano hasło',
    });
  },
  (errors) => {
    console.log('FORM INVALID', errors);
  },
);
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl">
    <CardHeader class="text-center items-center">
      <CardTitle class="flex text-xl pt-6"> Reset Hasła </CardTitle>
      <CardDescription class="flex text-xs pb-3"> Wpisz swoje nowe hasło </CardDescription>
    </CardHeader>
    <CardContent>
      <form id="form-vee-password-form" @submit.prevent="onSubmit">
        <FieldGroup>
          <VeeField name="password" v-slot="{ field, errors }">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="form-vee-demo-password"> Hasło </FieldLabel>
              <Input
                id="form-vee-demo-password"
                v-bind="field"
                type="password"
                placeholder="Wpisz twoje nowe hasło"
                :aria-invalid="!!errors.length"
                rules="required"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
          <VeeField v-slot="{ field, errors }" name="reset_password">
            <Field :data-invalid="!!errors.length">
              <FieldLabel for="form-vee-demo-reset-password"> Powtórz hasło </FieldLabel>
              <Input
                id="form-vee-demo-reset-password"
                v-bind="field"
                type="password"
                placeholder="Powtórz swoje nowe hasło"
                :aria-invalid="!!errors.length"
                rules="required"
              />
              <FieldError v-if="errors.length" :errors="errors" />
            </Field>
          </VeeField>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal">
        <Button type="submit" form="form-vee-password-form" class="w-full cursor-pointer">
          Resetuj hasło
        </Button>
      </Field>
    </CardFooter>
  </Card>
</template>
