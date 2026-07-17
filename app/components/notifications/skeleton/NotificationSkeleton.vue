<script setup lang="ts"></script>

<template>
  <div class="flex flex-col divide-y divide-border">
    <div v-for="n in 4" :key="n" class="flex gap-3 p-3">
      <Skeleton class="size-8 rounded-full shrink-0" />
      <div class="flex flex-col gap-1.5 w-full">
        <Skeleton class="h-3.5 w-3/4" />
        <Skeleton class="h-3 w-full" />
        <Skeleton class="h-3 w-1/2" />
      </div>
    </div>
  </div>
</template>
