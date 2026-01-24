<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '~/components/ui/field';
import { Input } from '~/components/ui/input';
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl">
    <CardHeader class="text-center items-center">
      <CardTitle class="flex text-xl pt-6"> Reset Hasła </CardTitle>
      <CardDescription class="flex text-xs pb-3"> Wpisz swoje nowe hasło </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="password"> Hasło </FieldLabel>
            <Input id="hasło" type="password" required />
          </Field>
          <Field>
            <div class="flex items-center">
              <FieldLabel for="password"> Powtórz hasło </FieldLabel>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit"> Resetuj hsało </Button>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
