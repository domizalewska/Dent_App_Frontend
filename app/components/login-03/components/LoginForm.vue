<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
</script>

<template>
  <Card>
    <CardHeader class="text-center">
      <CardTitle class="text-xl"> Welcome back </CardTitle>
      <CardDescription> Login with your email </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <FieldGroup>
          <Field>
            <FieldLabel for="email"> Email </FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </Field>
          <Field>
            <div class="flex items-center">
              <FieldLabel for="password"> Password </FieldLabel>
              <a href="#" class="ml-auto text-sm underline-offset-4 hover:underline">
                Zapomniałeś hasła?
              </a>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit"> Zaloguj się </Button>
            <FieldDescription class="text-center">
              Nie posiadasz konta?
              <a href="#"> Zarejestruj się </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
