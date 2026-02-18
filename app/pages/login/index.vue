<script setup lang="ts">
import LoginForm from '~/components/login/LoginForm.vue'

definePageMeta({
  layout: 'login',
})
</script>

<template>
  <div class="flex w-1/3 pr-20 pt-12 pb-12 flex-col">
    <LoginForm class="flex-1" />
  </div>
</template>
