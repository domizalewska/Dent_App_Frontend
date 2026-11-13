<script setup lang="ts">
import { Form } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { PermissionGroupType } from '~/types'

interface Props {
  group?: PermissionGroupType
}
const props = defineProps<Props>()
const emit = defineEmits(['submit', 'cancel'])

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Nazwa jest wymagana'),
    description: z.string().optional().nullable(),
  }),
)

const initialValues = {
  name: props.group?.name ?? '',
  description: props.group?.description ?? '',
}

function onSubmit(values: { name: string; description?: string | null }) {
  emit('submit', values)
}
</script>

<template>
  <Form
    :validation-schema="formSchema"
    :initial-values="initialValues"
    class="flex flex-1 flex-col min-h-0 overflow-hidden"
    @submit="onSubmit"
  >
    <div class="flex-1 overflow-y-auto min-h-0 px-3 py-4 flex flex-col gap-4">
      <BaseInputForm name="name" label="Nazwa grupy" placeholder="Wpisz nazwę grupy" />
      <BaseTextareaForm name="description" label="Opis" placeholder="Opcjonalny opis grupy" />
    </div>
    <div class="border-t px-3 py-3">
      <BaseAcceptDeclineButtons
        confirm-title="Zapisz"
        cancel-title="Anuluj"
        confirm-type="submit"
        @cancel="emit('cancel')"
      />
    </div>
  </Form>
</template>
