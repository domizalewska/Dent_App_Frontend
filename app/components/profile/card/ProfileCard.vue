<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
import type { User } from '~/types'

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
          <CardDescription class="text-xs">Podgląd danych pracownika</CardDescription>
        </div>
      </div>
    </CardHeader>

    <CardContent class="divide-y p-0">
      <div class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Dane osobowe</p>
        <div class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <div class="text-muted-foreground">Imię i nazwisko</div>
          <div class="font-medium">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="text-muted-foreground">PESEL</div>
          <div class="font-medium">{{ user.pesel ?? '—' }}</div>
          <div class="text-muted-foreground">Płeć</div>
          <div class="font-medium">
            <span class="text-xs font-normal text-muted-foreground">(z PESEL)</span>
          </div>
          <div class="text-muted-foreground">Stanowisko</div>
          <div class="font-medium">{{ user.job_positions?.[0]?.name ?? '—' }}</div>
        </div>
      </div>

      <div class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Adres</p>
        <div class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <div class="text-muted-foreground">Ulica i numer domu</div>
          <div class="font-medium">{{ user.street ?? '—' }} {{ user.house_number ?? '' }}</div>
          <template v-if="user.apartment_number">
            <div class="text-muted-foreground">Nr mieszkania</div>
            <div class="font-medium">{{ user.apartment_number }}</div>
          </template>
          <div class="text-muted-foreground">Kod pocztowy</div>
          <div class="font-medium">{{ user.postal_code ?? '—' }}</div>
          <div class="text-muted-foreground">Miejscowość</div>
          <div class="font-medium">{{ user.city ?? '—' }}</div>
        </div>
      </div>

      <div class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Kontakt</p>
        <div class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <div class="text-muted-foreground">Telefon prywatny</div>
          <div class="font-medium">
            {{ user.phone_number?.find((p) => p.type === 'PRIVATE')?.number ?? '—' }}
          </div>
          <div class="text-muted-foreground">Telefon służbowy</div>
          <div class="font-medium">
            {{ user.phone_number?.find((p) => p.type === 'WORK')?.number ?? '—' }}
          </div>
          <div class="text-muted-foreground">E-mail prywatny</div>
          <div class="font-medium text-primary">{{ user.private_email ?? '—' }}</div>
          <div class="text-muted-foreground">E-mail służbowy</div>
          <div class="font-medium text-primary">{{ user.email ?? '—' }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
