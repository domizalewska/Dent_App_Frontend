<script setup lang="ts">
import type { ScheduleRule } from '~/types'
import { ScheduleRuleEndpoints, scheduleRulesKey } from '~/features/schedule'

const emit = defineEmits(['close'])

const { data: rulesData } = useAPI<{ data: ScheduleRule[] }>(ScheduleRuleEndpoints.BASE, {
  key: scheduleRulesKey,
})
const rules = computed(() => rulesData.value?.data ?? [])
</script>

<template>
  <Dialog open @update:open="emit('close')">
    <DialogContent class="h-[600px] p-0 gap-0 flex flex-col">
      <DialogHeader class="px-4 pt-6 pb-0 shrink-0">
        <DialogTitle>Ustawienia grafiku</DialogTitle>
      </DialogHeader>
      <Tabs default-value="pattern" class="flex flex-col flex-1 min-h-0">
        <div class="px-4 pt-4 shrink-0">
          <TabsList variant="line" class="w-full">
            <TabsTrigger value="pattern" class="flex-1">Wzorzec tygodniowy</TabsTrigger>
            <TabsTrigger value="colors" class="flex-1">Kolory</TabsTrigger>
            <TabsTrigger value="google" class="flex-1">Google Calendar</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pattern" class="flex-1 overflow-y-auto mt-0">
          <ScheduleRuleForm :schedule-rule="rules" @cancel="emit('close')" />
        </TabsContent>
        <TabsContent value="colors" class="flex-1 overflow-y-auto mt-0">
          <ScheduleColorSettingsTab @cancel="emit('close')" />
        </TabsContent>
        <TabsContent value="google" class="flex-1 overflow-y-auto mt-0">
          <ScheduleGoogleCalendarTab />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
