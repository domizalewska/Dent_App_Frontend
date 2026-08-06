<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form, useFieldArray } from 'vee-validate'
import { z } from 'zod'
import { Trash2 } from 'lucide-vue-next'
import { DayOfWeek } from '~/types'
import type { ScheduleRule } from '~/types'
import BaseAcceptDeclineButtons from '~/components/base/buttons/BaseAcceptDeclineButtons.vue'
import { useDayOfWeek } from '~/composables/schedule/useDayOfWeek'

interface Props {
  prefill?: ScheduleRule[]
}

const props = defineProps<Props>()
const emit = defineEmits<{ submit: [rules: ScheduleRule[]] }>()

const { getDayLabel } = useDayOfWeek()

const dayOptions = Object.values(DayOfWeek).map((d) => ({ value: d, label: getDayLabel(d) }))

const formSchema = toTypedSchema(
  z.object({
    rules: z
      .array(
        z
          .object({
            day: z.nativeEnum(DayOfWeek),
            start_time: z.string().min(1),
            end_time: z.string().min(1),
          })
          .refine((r) => r.start_time < r.end_time, {
            message: 'Godzina zakończenia musi być po rozpoczęciu',
            path: ['end_time'],
          }),
      )
      .min(1, 'Dodaj przynajmniej jedną regułę'),
  }),
)

const initialValues = computed(() => ({
  rules: props.prefill ?? [],
}))

const current = reactive<ScheduleRule>({
  day: DayOfWeek.Monday,
  start_time: '08:00',
  end_time: '16:00',
})

const { fields, push, remove } = useFieldArray<ScheduleRule>('rules')

function addRule() {
  if (current.start_time >= current.end_time) return
  push({ ...current })
}

function onSubmit(values: { rules: ScheduleRule[] }) {
  emit('submit', values.rules)
}
</script>

<template>
  <Form
    :validation-schema="formSchema"
    :initial-values="initialValues"
    class="divide-y"
    @submit="onSubmit"
  >
    <div class="px-4 py-4 space-y-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nowa reguła</p>
      <div class="flex items-center gap-2">
        <Select v-model="current.day">
          <SelectTrigger class="flex-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="opt in dayOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <input
          v-model="current.start_time"
          type="time"
          class="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
        />
        <input
          v-model="current.end_time"
          type="time"
          class="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
        />
      </div>
      <Button type="button" variant="outline" size="sm" @click="addRule"> + Dodaj regułę </Button>
    </div>

    <div v-if="fields.length" class="px-4 py-2 space-y-1">
      <div
        v-for="(field, i) in fields"
        :key="field.key"
        class="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
      >
        <span
          >{{ getDayLabel(field.value.day) }}, {{ field.value.start_time }} -
          {{ field.value.end_time }}</span
        >
        <Button type="button" variant="ghost" size="icon-xs" @click="remove(i)">
          <Trash2 class="size-3.5 text-destructive" />
        </Button>
      </div>
    </div>

    <div class="flex items-center justify-end gap-3 px-4 py-3">
      <BaseAcceptDeclineButtons accept-title="Zapisz" decline-title="Anuluj" />
    </div>
  </Form>
</template>
