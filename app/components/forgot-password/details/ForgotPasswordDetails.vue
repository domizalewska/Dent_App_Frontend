<script setup lang="ts">
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
</script>

<template>
  <Card class="flex justify-center border-0 shadow-2xl max-w-md mx-auto">
    <CardHeader class="text-center items-center">
      <CardTitle class="text-xl pt-6">Reset Hasła</CardTitle>
      <CardDescription class="text-xs pb-3">
        Wysłaliśmy ci link do zresetowania hasła, sprawdź skrzynkę odbiorczą.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <CardFooter class="flex flex-col">
        <Button class="w-full mb-4" type="submit" @click="navigateTo('/login')">
          Zaloguj się
        </Button>
      </CardFooter>
    </CardContent>
  </Card>
</template>
