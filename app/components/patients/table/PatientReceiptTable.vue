<script setup lang="ts">
import { receiptColumns, ReceiptEndpoints } from '~/features/receipt'
import DataTable from '~/components/ui/data-table/data-table.vue'
import type { Receipt } from '~/types'
import { mockReceipts } from '~/mock/receipt/mockReceipt'

interface Props {
  patientUuid: string
}

const props = defineProps<Props>()

const { data: receiptData } = usePaginatedAPI<Receipt>(() =>
  ReceiptEndpoints.BY_PATIENT(props.patientUuid),
)
</script>
<template>
  <DataTable :columns="receiptColumns" :data="receiptData?.data ?? mockReceipts" />
</template>
