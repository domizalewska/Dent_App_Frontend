<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import DocumentsList from '~/components/documents/DocumentsList.vue'
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center gap-2">
        <Calendar class="size-4 text-muted-foreground" aria-hidden="true" />
        <div>
          <CardTitle class="text-sm font-medium">Dokumenty</CardTitle>
          <CardDescription class="text-xs"> Sprawdź swoje dokumenty </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <DocumentsList />
    </CardContent>
  </Card>
</template>
