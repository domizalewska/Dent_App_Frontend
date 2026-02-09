<script setup lang="ts">
import { useHeader } from '~/composables/useHeader';
import { useBreadcrumbs } from '~/composables/useBreadcrumbs';

definePageMeta({
  layout: 'dashboard',
});

const { setHeader, resetHeader } = useHeader();

resetHeader();
setHeader('Profile');

const { set } = useBreadcrumbs();

set([{ name: 'Profile', link: '/profile' }]);
</script>

<template></template>
