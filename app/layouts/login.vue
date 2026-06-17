<script setup lang="ts"></script>
<template>
  <div class="relative flex min-h-screen bg-[url(/gradient.jpg)] bg-cover bg-center">
    <div
      class="absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100 dark:bg-black/60"
    />

    <div class="relative z-10 hidden lg:flex w-1/2 items-center justify-center pl-16">
      <div class="flex flex-col items-start justify-center">
        <div class="flex flex-col items-center">
          <img class="rounded-full w-32 h-32" alt="logo" />
          <h3 class="text-xl font-semibold">DentApp</h3>
        </div>
        <span class="text-xs">System zarządzania gabinetem stomatologicznym</span>
      </div>
    </div>

    <div class="relative z-10 w-full lg:w-1/2 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
