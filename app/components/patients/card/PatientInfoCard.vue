<script setup lang="ts">
import { UserRound } from 'lucide-vue-next'
import type { Patient } from '~/types'

interface Props {
  patient: Patient
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden rounded-t-none py-0 gap-0">
    <CardHeader class="border-b mt-5 px-4 py-3">
      <div class="flex items-center gap-2">
        <UserRound class="size-4 text-muted-foreground" />
        <div>
          <CardTitle class="text-sm font-medium">Dane pacjenta</CardTitle>
          <CardDescription class="text-xs">Podgląd danych pacjenta</CardDescription>
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
              <div class="font-medium">{{ patient.first_name }} {{ patient.last_name }}</div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">PESEL</div>
              <div class="font-medium">{{ patient.pesel ?? '—' }}</div>
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
              <div class="font-medium">
                {{ patient.street ?? '—' }} {{ patient.house_number ?? '' }}
              </div>
            </div>
            <template v-if="patient.apartment_number">
              <div class="flex items-center justify-between gap-4">
                <div class="text-muted-foreground">Nr mieszkania</div>
                <div class="font-medium">{{ patient.apartment_number }}</div>
              </div>
            </template>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Kod pocztowy</div>
              <div class="font-medium">{{ patient.postal_code ?? '—' }}</div>
            </div>
            <div class="flex items-center justify-between gap-4">
              <div class="text-muted-foreground">Miejscowość</div>
              <div class="font-medium">{{ patient.city ?? '—' }}</div>
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
                v-if="patient.phone_number"
                :href="`tel:${patient.phone_number}`"
                class="hover:underline"
                >{{ patient.phone_number }}</a
              >
              <span v-else>—</span>
            </div>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="text-muted-foreground">E-mail prywatny</div>
            <div class="font-medium">
              <a v-if="patient.email" :href="`mailto:${patient.email}`" class="hover:underline">{{
                patient.email
              }}</a>
              <span v-else>—</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
