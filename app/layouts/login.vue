<script setup lang="ts">
import { StethoscopeIcon } from 'lucide-vue-next'
</script>
<template>
  <div class="relative flex min-h-screen bg-[url(/gradient.jpg)] bg-cover bg-center">
    <div
      class="absolute inset-0 transition-opacity duration-300 opacity-0 dark:opacity-100 dark:bg-background/75"
    />

    <div class="relative z-10 hidden lg:flex w-1/2 items-center justify-center px-16">
      <div class="flex flex-col items-start gap-4 max-w-md">
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center size-12 rounded-xl bg-primary/15 border border-primary/25"
          >
            <StethoscopeIcon class="size-6 text-primary" />
          </div>
          <h3 class="text-2xl font-bold tracking-tight text-foreground">DentApp</h3>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed">
          System zarządzania gabinetem stomatologicznym — umawiaj wizyty, prowadź kartoteki
          pacjentów i zarządzaj kalendarzem w jednym miejscu.
        </p>
      </div>
    </div>

    <div class="relative z-10 w-full lg:w-1/2 flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>
