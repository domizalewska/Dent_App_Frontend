<script setup lang="ts">
import { Settings } from 'lucide-vue-next'
import ScheduleSettings from '~/components/schedule/dialog/ScheduleSettings.vue'
import { useDialog } from '~/composables/useDialog'

const { open, close, activeProps, activeComponent } = useDialog()
</script>

<template>
  <component :is="activeComponent" v-bind="activeProps" @close="close" />
  <Button
    variant="outline"
    size="icon-xs"
    aria-label="Ustawienia grafiku"
    @click="open(ScheduleSettings)"
  >
    <Settings class="size-4" />
  </Button>
</template>
