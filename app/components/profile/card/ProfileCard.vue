<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
import { ref } from 'vue'
import type { User } from '~/types'

interface Props {
  user: User
}

defineProps<Props>()

const isEditOpen = ref(false)
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
      <section class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Dane osobowe</p>
        <dl class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <dt class="text-muted-foreground">Imię i nazwisko</dt>
          <dd class="font-medium">{{ user.first_name }} {{ user.last_name }}</dd>
          <dt class="text-muted-foreground">PESEL</dt>
          <dd class="font-medium">{{ user.pesel ?? '—' }}</dd>
          <dt class="text-muted-foreground">Płeć</dt>
          <dd class="font-medium">
            <span class="text-xs font-normal text-muted-foreground">(z PESEL)</span>
          </dd>
          <dt class="text-muted-foreground">Stanowisko</dt>
          <dd class="font-medium">{{ user.job_position?.name ?? '—' }}</dd>
          <template v-if="user.pwz_number">
            <dt class="text-muted-foreground">Nr licencji</dt>
            <dd class="font-medium">{{ user.pwz_number }}</dd>
          </template>
        </dl>
      </section>

      <section class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Adres</p>
        <dl class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <dt class="text-muted-foreground">Ulica i numer domu</dt>
          <dd class="font-medium">{{ user.street ?? '—' }} {{ user.house_number ?? '' }}</dd>
          <template v-if="user.apartment_number">
            <dt class="text-muted-foreground">Nr mieszkania</dt>
            <dd class="font-medium">{{ user.apartment_number }}</dd>
          </template>
          <dt class="text-muted-foreground">Kod pocztowy</dt>
          <dd class="font-medium">{{ user.postal_code ?? '—' }}</dd>
          <dt class="text-muted-foreground">Miejscowość</dt>
          <dd class="font-medium">{{ user.city ?? '—' }}</dd>
        </dl>
      </section>

      <section class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Kontakt</p>
        <dl class="grid grid-cols-[160px_1fr] gap-x-4 gap-y-2.5 text-sm">
          <dt class="text-muted-foreground">Telefon prywatny</dt>
          <dd class="font-medium">{{ user.private_phone_number ?? '—' }}</dd>
          <dt class="text-muted-foreground">Telefon służbowy</dt>
          <dd class="font-medium">{{ user.phone_number ?? '—' }}</dd>
          <dt class="text-muted-foreground">E-mail prywatny</dt>
          <dd class="font-medium text-primary">{{ user.private_email ?? '—' }}</dd>
          <dt class="text-muted-foreground">E-mail służbowy</dt>
          <dd class="font-medium text-primary">{{ user.email ?? '—' }}</dd>
        </dl>
      </section>
    </CardContent>
  </Card>
</template>
