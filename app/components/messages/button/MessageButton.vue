<script setup lang="ts">
import { MessageCircleIcon } from 'lucide-vue-next'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="ghost" class="rounded-full">
        <MessageCircleIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[400px]" align="end">
      <MessageNotificationCard />
    </PopoverContent>
  </Popover>
</template>
