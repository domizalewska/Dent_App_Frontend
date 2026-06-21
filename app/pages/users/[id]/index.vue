<script setup lang="ts">
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import { useHeader } from '~/composables/useHeader'
import type { User } from '~/types'
import { UsersEndpoints } from '~/features/users'
import { useAPI } from '~/composables/useAPI'
import { profileKey } from '~/composables/profile/key'

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

const { data: userData, pending, error } = await useAPI<User>(`${UsersEndpoints(id).DETAIL}`, { key: profileKey(id) })
</script>

<template>
  <div class="flex flex-col w-full justify-center items-center px-6">
    <ProfileTabs v-if="userData" :user="userData" />
  </div>
</template>
