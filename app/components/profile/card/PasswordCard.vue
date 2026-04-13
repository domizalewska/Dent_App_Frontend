<script setup lang="ts">
import { Shield } from 'lucide-vue-next'
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center gap-2">
        <Shield class="size-4 text-muted-foreground" aria-hidden="true" />
        <div>
          <CardTitle class="text-sm font-medium">Zmień hasło</CardTitle>
          <CardDescription class="text-xs">
            Aktualizuj swoje hasło regularnie dla bezpieczeństwa
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <PasswordForm />
    </CardContent>
  </Card>
</template>
