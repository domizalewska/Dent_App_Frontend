<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import type { User } from '~/types'
import DocumentsList from '~/components/documents/DocumentsList.vue'

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader>
      <div class="flex items-center gap-2">
        <Calendar class="size-4 text-muted-foreground" aria-hidden="true" />
        <div>
          <CardTitle class="text-sm font-medium">Dokumenty</CardTitle>
          <CardDescription class="text-xs"> Sprawdź swoje dokumenty </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <DocumentsList :user="user" />
    </CardContent>
  </Card>
</template>
