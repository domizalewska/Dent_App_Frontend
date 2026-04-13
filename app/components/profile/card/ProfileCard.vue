<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
</script>

<template>
  <Card class="overflow-hidden rounded-t-none">
    <CardHeader class="border-b px-4 py-3">
      <div class="flex items-center gap-2">
        <UserRound class="size-4 text-muted-foreground" aria-hidden="true" />
        <div>
          <CardTitle class="text-sm font-medium">Dane użytkownika</CardTitle>
          <CardDescription class="text-xs">
            Zaktualizuj swoje dane osobowe
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <form class="px-4 py-4">
        <div class="space-y-1.5">
          <Label for="first-name" class="text-xs font-medium text-muted-foreground">Imię</Label>
          <Input id="first-name" placeholder="Wpisz imię" />
        </div>
        <div class="mt-5 space-y-1.5">
          <Label for="last-name" class="text-xs font-medium text-muted-foreground">Nazwisko</Label>
          <Input id="last-name" placeholder="Wpisz nazwisko" />
        </div>
        <div class="mt-5 space-y-1.5">
          <Label for="email" class="text-xs font-medium text-muted-foreground">Email</Label>
          <Input id="email" type="email" placeholder="Wpisz email" />
        </div>
        <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
          <Button variant="ghost" size="sm" type="button">Anuluj</Button>
          <Button size="sm" type="submit" class="min-w-[140px]">Zapisz zmiany</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
