<script setup lang="ts">
import LoginForm from '~/components/login-03/components/LoginForm.vue';
</script>

<template>
  <div class="flex min-h-screen justify-between bg-[url(/gradient.jpg)] bg-cover bg-center">
    <div class="flex h-screen items-center justify-center p-12">
      <div class="flex flex-col items-start justify-center">
        <h3 class="text-xl font-semibold">Twoje nowe hasło</h3>
        <span class="text-sm text-gray-500">Tutaj jest przykładowy tekst</span>
      </div>
    </div>
    <div class="flex w-1/2 pr-12 pt-12 pb-12 flex-col">
      <LoginForm class="flex-1" />
    </div>
  </div>
</template>
