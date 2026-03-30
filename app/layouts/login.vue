<script setup lang="ts"></script>

<template>
  <div class="flex min-h-screen bg-[url(/gradient.jpg)] bg-cover bg-center">
    <div class="hidden lg:flex w-1/2 items-center justify-center pl-16">
      <div class="flex flex-col items-start justify-center">
        <h3 class="text-xl font-semibold">Twoje nowe hasło</h3>
        <span class="text-sm text-gray-500"> Tutaj jest przykładowy tekst </span>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
