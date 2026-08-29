<script setup lang="ts">
interface Props {
  confirmTitle?: string
  cancelTitle?: string
  confirmType?: 'submit' | 'reset' | 'button'
  confirmDisabled?: boolean
  confirmForm?: string
  hideCancel?: boolean
  hideConfirm?: boolean
}

withDefaults(defineProps<Props>(), {
  confirmTitle: 'Zapisz',
  cancelTitle: 'Anuluj',
  confirmType: 'button',
})

const emit = defineEmits(['cancel', 'accept'])
</script>

<template>
  <div class="flex w-full gap-2">
    <slot name="start" />
    <Button
      v-if="!hideCancel"
      type="button"
      variant="secondary"
      size="sm"
      class="flex-1"
      @click="emit('cancel')"
    >
      {{ cancelTitle }}
    </Button>

    <slot name="middle" />

    <Button
      v-if="!hideConfirm"
      :type="confirmType"
      :form="confirmForm"
      :disabled="confirmDisabled"
      size="sm"
      class="flex-1"
      @click="emit('accept')"
    >
      {{ confirmTitle }}
    </Button>

    <slot name="end" />
  </div>
</template>
