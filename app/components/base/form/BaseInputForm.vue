<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next'
import { useField } from 'vee-validate'

interface Props {
  name: string
  label: string
  placeholder: string
  type?: string
  size?: 'sm' | 'default'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'default',
})

const { value, errorMessage } = useField<string>(() => props.name)
const showPassword = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})
</script>

<template>
  <div class="space-y-1.5">
    <Label :for="name" class="px-2 text-xs font-medium text-muted-foreground">{{ label }}</Label>
    <div class="relative">
      <Input
        :id="name"
        v-model="value"
        :name="name"
        :placeholder="placeholder"
        :type="inputType"
        :aria-invalid="!!errorMessage"
        :class="['rounded-md', 'placeholder:text-sm', { 'pr-10': type === 'password' }, { 'h-8 text-xs': size === 'sm' }]"
      />
      <Button
        v-if="type === 'password'"
        variant="ghost"
        size="sm"
        type="button"
        class="absolute right-0 top-0 h-full rounded-md px-3 hover:bg-transparent"
        @click="showPassword = !showPassword"
      >
        <Eye v-if="!showPassword" class="size-4 text-muted-foreground" />
        <EyeOff v-else class="size-4 text-muted-foreground" />
      </Button>
    </div>
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>
