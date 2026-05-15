<script setup lang="ts">
import { useJobPositions } from '~/composables/job-positions/useJobPositions'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{ uuid: string }>()

const { deleteRecord } = useJobPositions()
const showConfirm = ref(false)

async function onConfirm() {
  await deleteRecord(props.uuid)
  showConfirm.value = false
}
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="rounded-full cursor-pointer"
    @click.stop="showConfirm = true"
  >
    <Trash2 class="size-4" />
  </Button>
  <BaseConfirmDialog
    v-if="showConfirm"
    title="Usuń stanowisko"
    description="Stanowisko zostanie trwale usunięte."
    @confirm="onConfirm"
    @cancel="showConfirm = false"
  />
</template>
