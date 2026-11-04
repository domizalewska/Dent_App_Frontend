<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Form } from 'vee-validate'
import { z } from 'zod'
import { type Receipt, ReceiptEnumType, type ReceiptPayload } from '~/types'
import BaseInputForm from '~/components/base/form/BaseInputForm.vue'
import BaseSelectForm from '~/components/base/form/BaseSelectForm.vue'
import { MedicineEndpoints } from '~/features/medicine'

const emit = defineEmits(['confirm', 'cancel'])

const formRef = ref()

const formSchema = toTypedSchema(
  z.object({
    type: z.string().nonempty('Typ jest wymagany'),
    medicine_uuid: z.string().nonempty('Lek jest wymagany'),
  }),
)

async function onSubmit(values: ReceiptPayload) {
  const payload: ReceiptPayload = {
    ...values,
  }
  emit('confirm', payload)
}
</script>

<template>
  <Form
    ref="formRef"
    :validation-schema="formSchema"
    class="flex flex-1 flex-col min-h-0 overflow-hidden"
    @submit="onSubmit"
  >
    <div class="flex-1 overflow-y-auto min-h-0 px-3 py-4 flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-2">
          <BaseSelectForm
            name="type"
            label="Typ recepty"
            placeholder="Wybierz typ recepty"
            :options="[
              {
                label: ReceiptEnumType.RP,
                value: ReceiptEnumType.RP,
              },
              {
                label: ReceiptEnumType.RPW,
                value: ReceiptEnumType.RPW,
              },
              {
                label: ReceiptEnumType.RPZ,
                value: ReceiptEnumType.RPZ,
              },
            ]"
          />
        </div>

        <div class="flex flex-row gap-2">
          <BaseSelectForm
            name="medicine_uuid"
            label="Lek"
            placeholder="Wybierz lek"
            :api-url="MedicineEndpoints.LIST_SELECT"
            :option-value="(e: Receipt) => e.uuid"
            :option-label="(e: Receipt) => e.name"
            immediate-fetch
          />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-2">
            <BaseInputForm
              name="medicine.dosage"
              label="Dawkowanie"
              placeholder="Wpisz dawkowanie leku"
              type="text"
            />
            <BaseInputForm
              name="medicine.quantity"
              label="Ilość"
              placeholder="Wpisz ilość opakowań"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="border-t px-3 py-3">
      <Button size="sm" type="submit" class="min-w-[140px] rounded-lg">Zapisz</Button>
    </div>
  </Form>
</template>
