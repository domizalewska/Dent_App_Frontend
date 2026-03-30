<script setup lang="ts">
import ForgotPasswordForm from '~/components/forgot-password/form/ForgotPasswordForm.vue'

definePageMeta({
  layout: 'login',
})
</script>

<template>
  <div class="flex w-1/3 pr-20 pt-12 pb-12 flex-col">
    <ForgotPasswordForm class="flex-1" />
  </div>
</template>
