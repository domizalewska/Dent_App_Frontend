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

set([{ name: 'Profil', link: '/profile' }])
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex">
      <ProfileHeaderComponent />
    </div>
    <div class="flex flex-col w-[700px]">
      <ProfileTabs />
    </div>
  </div>
</template>
