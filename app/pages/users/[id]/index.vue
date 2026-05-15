<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'
import { useAPI } from '~/composables/useAPI'

definePageMeta({
  layout: 'dashboard',
})

const { params } = useRoute()
const { id } = params as { id: string }

const { setHeader, resetHeader } = useHeader()

resetHeader()
setHeader('Profil')

const { set } = useBreadcrumbs()

set([{ name: 'Profil', link: '/profile' }])

const { data: userData, pending, error } = await useAPI<User>(`${UsersEndpoints(id).USER_DETAILS}`)
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex flex-col w-[700px]">
      <ProfileTabs v-if="userData" :user="userData" />
    </div>
  </div>
</template>
