<script setup lang="ts">
const colorMode = useColorMode();

onMounted(() => {
  colorMode.preference = 'light';
  colorMode.value = 'light';
});
</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>
