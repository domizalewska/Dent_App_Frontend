<script setup lang="ts">
interface Props {
  time: string
  patientName: string
  procedure: string
  doctorName: string
  room: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center gap-6 px-6 py-5 border-b border-border last:border-b-0">
    <span class="text-base font-semibold text-foreground w-14 shrink-0">{{ time }}</span>

    <div class="w-px self-stretch bg-border shrink-0" />

    <div class="flex-1 min-w-0">
      <p class="font-semibold text-foreground">{{ patientName }}</p>
      <p class="text-sm text-muted-foreground truncate">{{ procedure }} · {{ doctorName }}</p>
    </div>

    <span class="text-sm text-muted-foreground shrink-0">{{ room }}</span>
  </div>
</template>
