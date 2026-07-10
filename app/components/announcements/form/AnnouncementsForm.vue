<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form } from 'vee-validate'
import { formatDateToString } from '~/utils/formatDate'
import type { Announcement, AnnouncementPayload } from '~/types'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseTextareaForm from '~/components/base/form/BaseTextareaForm.vue'

interface Props {
  initialValues?: Announcement
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [values: AnnouncementPayload]
  cancel: []
}>()

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, 'Tytuł jest wymagany'),
    content: z.string().min(1, 'Treść jest wymagana'),
  }),
)

const initialFormValues = {
  title: props.initialValues?.title ?? '',
  content: props.initialValues?.content ?? '',
}

function onSubmit(values: { title: string; content: string }) {
  emit('submit', { ...values, published_at: formatDateToString(new Date(), 'yyyy-MM-dd') })
}
</script>

<template>
  <Form
    class="px-4 py-4"
    :validation-schema="formSchema"
    :initial-values="initialFormValues"
    @submit="onSubmit"
  >
    <div class="mb-4 flex flex-col gap-4">
      <BaseInputForm name="title" label="Tytuł" placeholder="Wpisz tytuł ogłoszenia" />
      <BaseTextareaForm name="content" label="Treść" placeholder="Wpisz treść ogłoszenia" />
    </div>
    <div class="mt-5 flex items-center justify-end gap-3 border-t pt-4">
      <Button variant="ghost" size="sm" type="button" class="rounded-lg" @click="emit('cancel')">
        Anuluj
      </Button>
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
