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
    <DialogContent class="max-h-[90vh] overflow-y-auto p-0 gap-0">
      <DialogHeader class="px-4 pt-6 pb-0">
        <DialogTitle>Ustawienia grafiku</DialogTitle>
      </DialogHeader>
      <Tabs default-value="pattern" class="w-full">
        <div class="px-4 pt-4">
          <TabsList class="w-full">
            <TabsTrigger value="pattern" class="flex-1">Wzorzec tygodniowy</TabsTrigger>
            <TabsTrigger value="google" class="flex-1">Integracja z Google Calendar</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pattern">
          <ScheduleRuleForm :schedule-rule="rules" @cancel="emit('close')" />
        </TabsContent>
        <TabsContent value="google">
          <ScheduleGoogleCalendarTab />
        </TabsContent>
      </Tabs>
    </DialogContent>
  </Dialog>
</template>
