<script setup lang="ts>"></script>

<template>
  <BaseCard card-title="Zmień hasło" card-buttons class="mt-2">
    <template #content>
      <div class="grid gap-3">
        <Label for="tabs-demo-name">Hasło</Label>
        <Input id="tabs-demo-name" placeholder="Wpisz swoje hasło" type="password" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Nowe hasło</Label>
        <Input id="tabs-demo-username" placeholder="Wpisz swoje nowe hasło" type="password" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Powtórz nowe hasło</Label>
        <Input id="tabs-demo-username" placeholder="Powtórz swoje nowe hasło" type="password" />
      </div>
    </template>
  </BaseCard>
</template>
