<script setup lang="ts">
import ForgotPasswordDetails from '~/components/forgot-password/details/ForgotPasswordDetails.vue'

definePageMeta({
  layout: 'login',
})
</script>

<template>
  <div class="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-6 md:p-10">
    <ForgotPasswordDetails class="flex-1" />
  </div>
</template>
