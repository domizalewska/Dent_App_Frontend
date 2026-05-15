<template>
  <div class="relative flex min-h-screen bg-[url(/gradient.jpg)] bg-cover bg-center">
    <div
      class="absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100 dark:bg-black/60"
    />

    <div class="relative z-10 hidden lg:flex w-1/2 items-center justify-center pl-16">
      <div class="flex flex-col items-start justify-center">
        <h3 class="text-xl font-semibold">Twoje nowe hasło</h3>
        <span class="text-sm text-gray-500">Tutaj jest przykładowy tekst</span>
      </div>
    </div>

    <div class="relative z-10 w-full lg:w-1/2 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
