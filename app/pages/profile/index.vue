<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'

definePageMeta({
  layout: 'dashboard',
})

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Profil')

const { set } = useBreadcrumbs()

set([{ name: 'Profil', link: '/profil' }])
</script>

<template>
  <div class="flex w-full">
    <div class="flex w-full flex-col">
      <ProfileHeaderComponent />
    </div>
  </div>
  <div class="flex flex-col w-full justify-center items-center">
    <ProfileTabs />
  </div>
</template>
