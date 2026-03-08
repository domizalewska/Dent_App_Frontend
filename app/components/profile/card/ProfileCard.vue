<script setup lang="ts>"></script>
<template>
  <BaseCard card-title="Dane użytkownika" card-buttons class="mt-2">
    <template #content>
      <div class="grid gap-3">
        <Label for="tabs-demo-name">Imię</Label>
        <Input id="tabs-demo-name" default-value="Pedro" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Nazwisko</Label>
        <Input id="tabs-demo-username" default-value="Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Email</Label>
        <Input id="tabs-demo-username" default-value="peduarte@gmail.com" />
      </div>
    </template>
    <template #footer>
      <Button class="flex justify-end mt-4">Zapisz zmiany</Button>
    </template>
  </BaseCard>
</template>
