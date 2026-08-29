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

    <CardContent class="p-0">
      <div class="flex border-b">
        <div class="flex-1 px-4 py-4">
          <p class="mb-3 text-sm font-medium">Dane osobowe</p>
          <div class="flex flex-col gap-2.5 text-sm">
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Imię i nazwisko</div>
              <div class="font-medium">{{ user.first_name }} {{ user.last_name }}</div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">PESEL</div>
              <div class="font-medium">{{ user.pesel ?? '—' }}</div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Płeć</div>
              <div class="font-medium">
                <span class="text-xs font-normal text-muted-foreground">(z PESEL)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="w-px self-stretch bg-border" />

        <div class="flex-1 px-4 py-4">
          <p class="mb-3 text-sm font-medium">Adres</p>
          <div class="flex flex-col gap-2.5 text-sm">
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Ulica i numer domu</div>
              <div class="font-medium">{{ user.street ?? '—' }} {{ user.house_number ?? '' }}</div>
            </div>
            <template v-if="user.apartment_number">
              <div class="flex items-center justify-between gap-4">
                <div class="text-muted-foreground">Nr mieszkania</div>
                <div class="font-medium">{{ user.apartment_number }}</div>
              </div>
            </template>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Kod pocztowy</div>
              <div class="font-medium">{{ user.postal_code ?? '—' }}</div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Miejscowość</div>
              <div class="font-medium">{{ user.city ?? '—' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 py-4">
        <p class="mb-3 text-sm font-medium">Kontakt</p>
        <div class="flex flex-col gap-2.5 text-sm">
          <div class="flex items-center justify-between gap-4">
            <div class="text-muted-foreground">Telefon prywatny</div>
            <div class="font-medium">
              <a
                v-if="user.phone_number?.find((p) => p.type === 'PRIVATE')?.number"
                :href="`tel:${user.phone_number?.find((p) => p.type === 'PRIVATE')?.number}`"
                class="hover:underline"
                >{{ user.phone_number?.find((p) => p.type === 'PRIVATE')?.number }}</a
              >
              <span v-else>—</span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="text-muted-foreground">Telefon służbowy</div>
            <div class="font-medium">
              <a
                v-if="user.phone_number?.find((p) => p.type === 'WORK')?.number"
                :href="`tel:${user.phone_number?.find((p) => p.type === 'WORK')?.number}`"
                class="hover:underline"
                >{{ user.phone_number?.find((p) => p.type === 'WORK')?.number }}</a
              >
              <span v-else>—</span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="text-muted-foreground">E-mail prywatny</div>
            <div class="font-medium">
              <a
                v-if="user.private_email"
                :href="`mailto:${user.private_email}`"
                class="hover:underline"
                >{{ user.private_email }}</a
              >
              <span v-else>—</span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="text-muted-foreground">E-mail służbowy</div>
            <div class="font-medium">
              <a v-if="user.email" :href="`mailto:${user.email}`" class="hover:underline">{{
                user.email
              }}</a>
              <span v-else>—</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
