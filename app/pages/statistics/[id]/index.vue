<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'

definePageMeta({ layout: 'dashboard' })

const { set } = useBreadcrumbs()
const { setHeader, resetHeader } = useHeader()

set([{ name: 'Statystyki', link: '/statistics' }])
resetHeader()
setHeader('Statystyki')
</script>
<template>
  <Card class="h-full"></Card>
</template>
