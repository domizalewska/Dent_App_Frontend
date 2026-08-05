<script setup lang="ts">
import { Link2, Repeat, Settings } from 'lucide-vue-next'

const emit = defineEmits<{
  'open-pattern': []
  'open-google': []
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon-xs" aria-label="Ustawienia grafiku">
        <Settings class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56">
      <DropdownMenuItem @click="emit('open-pattern')">
        <Repeat class="mr-2 size-4" />
        Wzorzec tygodniowy
      </DropdownMenuItem>
      <DropdownMenuItem @click="emit('open-google')">
        <Link2 class="mr-2 size-4" />
        Integracja z Google Calendar
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
