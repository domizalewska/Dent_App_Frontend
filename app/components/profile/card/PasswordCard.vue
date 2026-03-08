<script setup lang="ts>">
import BaseCard from '~/components/base/card/BaseCard.vue'
</script>

<template>
  <BaseCard card-title="Zmień hasło" card-buttons class="mt-2">
    <template #content>
      <div class="grid gap-3">
        <Label for="tabs-demo-name">Hasło</Label>
        <Input id="tabs-demo-name" default-value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Nowe hasło</Label>
        <Input id="tabs-demo-username" default-value="@peduarte" />
      </div>
      <div class="grid gap-3">
        <Label for="tabs-demo-username">Powtórz nowe hasło</Label>
        <Input id="tabs-demo-username" default-value="@peduarte" />
      </div>
    </template>
  </BaseCard>
</template>
