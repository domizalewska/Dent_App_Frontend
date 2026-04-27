<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
import type { User } from '~/types'
import ContactForm from '~/components/profile/form/ContactForm.vue'

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center gap-2">
        <UserRound class="size-4 text-muted-foreground" />
        <div>
          <CardTitle class="text-sm font-medium">Dane użytkownika</CardTitle>
          <CardDescription class="text-xs">Zaktualizuj dane pracownika</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <ContactForm :user="user" />
    </CardContent>
  </Card>
</template>
