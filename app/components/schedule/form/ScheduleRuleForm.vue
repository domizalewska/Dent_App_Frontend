<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { Trash2 } from 'lucide-vue-next'
import type { ScheduleRule, ScheduleRulePayload } from '~/types'
import { DayOfWeek } from '~/types'
import { useDayOfWeek } from '~/composables/schedule/useDayOfWeek'

interface Props {
  scheduleRule?: ScheduleRule[]
}

const props = defineProps<Props>()
const emit = defineEmits(['submit', 'cancel'])

const { getDayLabel } = useDayOfWeek()
const { addRule, deleteRule } = useScheduleRule()

const dayOptions = Object.values(DayOfWeek).map((d) => ({ value: d, label: getDayLabel(d) }))

const formSchema = toTypedSchema(
  z
    .object({
      day: z.nativeEnum(DayOfWeek),
      start_time: z.string().min(1, 'Wymagane'),
      end_time: z.string().min(1, 'Wymagane'),
    })
    .refine((r) => r.start_time < r.end_time, {
      message: 'Godzina zakończenia musi być po rozpoczęciu',
      path: ['end_time'],
    }),
)

const initialValues: ScheduleRulePayload = {
  day: DayOfWeek.Monday,
  start_time: '08:00',
  end_time: '16:00',
}

async function addScheduleRule(values: ScheduleRulePayload) {
  await addRule(values)
}

async function onDelete(uuid: string) {
  await deleteRule(uuid)
}
</script>

<template>
  <div class="divide-y">
    <Form
      :validation-schema="formSchema"
      :initial-values="initialValues"
      class="px-4 py-4 space-y-3"
      @submit="addScheduleRule"
    >
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nowa reguła</p>
      <div class="flex items-center gap-2">
        <BaseSelectForm name="day" class="flex-1">
          <SelectItem v-for="opt in dayOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </SelectItem>
        </BaseSelectForm>
        <BaseTimePickerForm name="start_time" size="sm" label="" />
        <BaseTimePickerForm name="end_time" size="sm" label="" />
      </div>
      <Button type="submit" variant="outline" size="sm">+ Dodaj regułę</Button>
    </Form>

    <div v-if="props.scheduleRule?.length" class="px-4 py-2 space-y-1">
      <div
        v-for="rule in props.scheduleRule"
        :key="rule.uuid"
        class="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
      >
        <span>{{ getDayLabel(rule.day) }}, {{ rule.start_time }} - {{ rule.end_time }}</span>
        <Button type="button" variant="ghost" size="icon-xs" @click="onDelete(rule.uuid)">
          <Trash2 class="size-3.5 text-destructive" />
        </Button>
      </div>
    </div>

    <div class="px-4 py-3">
      <BaseAcceptDeclineButtons
        accept-title="Zapisz"
        decline-title="Anuluj"
        @decline="emit('cancel')"
      />
    </div>
  </div>
</template>
