<script setup lang="ts" generic="T">
import { computed, ref, toRefs } from 'vue'
import { useField } from 'vee-validate'
import { usePaginatedAPI } from '~/composables/useAPI'
import { usePagination } from '~/composables/usePagination'
import type { PaginatedResponse, PaginatedResult } from '~/types'

defineOptions({ inheritAttrs: false })

interface Props<T> {
  name: string
  label?: string
  placeholder?: string
  size?: 'sm' | 'default'
  apiUrl?: string | (() => string)
  apiKey?: string
  options?: T[]
  additionalOptions?: T[]
  optionValue?: string | ((option: T) => string)
  optionLabel?: string | ((option: T) => string)
  optionDisabled?: string | ((option: T) => boolean)
  modelValue?: any
  assignValue?: boolean
  immediateFetch?: boolean
  withPagination?: boolean
  dataKey?: string
  additionalParams?: any
  rules?: string
}

const props = withDefaults(defineProps<Props<T>>(), {
  label: undefined,
  placeholder: 'Wybierz...',
  size: 'default',
  apiUrl: undefined,
  apiKey: undefined,
  options: undefined,
  additionalOptions: undefined,
  optionValue: undefined,
  optionLabel: 'label',
  optionDisabled: undefined,
  modelValue: undefined,
  assignValue: false,
  immediateFetch: false,
  withPagination: false,
  dataKey: undefined,
  additionalParams: undefined,
  rules: undefined,
})

const { rules } = toRefs(props)

const { value, errorMessage, handleChange } = useField(props.name, rules, {
  syncVModel: true,
  validateOnValueUpdate: true,
  keepValueOnUnmount: true,
  label: props.label,
})

const { paramsData, setPage, pagination } = usePagination({ initialPerPage: 50 })
const serverData = ref<T[] | PaginatedResponse<T>>()
const params = computed(() => props.additionalParams)

const resolvedApiUrl = computed(() =>
  typeof props.apiUrl === 'function' ? props.apiUrl() : (props.apiUrl ?? '')
)

const { status, execute } = usePaginatedAPI<T[]>(resolvedApiUrl.value, {
  key: props.apiKey,
  immediate: props.immediateFetch,
  params: props.withPagination ? paramsData : params,
  onResponse: ({ response }: { response: unknown }) => {
    if (!props.withPagination) {
      serverData.value = response?._data as T[]
      return
    }
    const data = response?._data as PaginatedResult<T>
    let isPaginating = false
    if (
      serverData.value &&
      typeof serverData.value === 'object' &&
      'pagination' in serverData.value
    ) {
      isPaginating =
        data.current_page >
        (serverData.value as PaginatedResponse<T>).pagination.current_page
    }
    serverData.value = {
      pagination: {
        current_page: data.current_page,
        from: data.from,
        last_page: data.last_page,
        per_page: data.per_page,
        to: data.to,
        total: data.total,
      },
      data: isPaginating
        ? [
          ...((serverData.value as PaginatedResponse<T>)?.data ?? []),
          ...data.data,
        ]
        : [...data.data],
    }
  },
})

function resolveOption(
  option: T,
  resolver: string | ((option: T) => string) | undefined
): string {
  if (typeof resolver === 'function') return resolver(option)
  if (typeof resolver === 'string') return String((option as any)[resolver])
  return String(option)
}

function isOptionDisabled(option: T): boolean {
  if (typeof props.optionDisabled === 'function') return props.optionDisabled(option)
  if (typeof props.optionDisabled === 'string') return !!(option as any)[props.optionDisabled]
  return false
}

const mergedOptions = computed(() => {
  if (!props.apiUrl) {
    let options = props.options ?? []
    if (props.additionalOptions) options = [...props.additionalOptions, ...options]
    return options
  }

  const raw = (serverData.value as PaginatedResponse<T>)?.data ?? (serverData.value as T[]) ?? []

  if (!props.modelValue || !props.assignValue) {
    let options = raw
    if (props.additionalOptions) options = [...props.additionalOptions, ...options]
    return options
  }

  let options: T[] = [...raw]
  const findOption = options.find(
    (option) => JSON.stringify(option) === JSON.stringify(props.modelValue)
  )
  if (!findOption) options.unshift(props.modelValue)
  if (props.additionalOptions) options = [...props.additionalOptions, ...options]
  return options
})

function onOpenChange(open: boolean) {
  if (open && props.apiUrl && !serverData.value) {
    execute()
  }
}

function onScrolledToBottom(event: Event) {
  if (!props.withPagination) return
  const target = event.target as HTMLElement
  if (target.scrollHeight - target.scrollTop > target.clientHeight + 50) return
  const data = serverData.value as PaginatedResponse<T>
  if (data?.pagination && pagination.value.current_page < data.pagination.last_page) {
    setPage(pagination.value.current_page + 1)
    execute()
  }
}


defineExpose({ execute })
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label v-if="label" :for="name" class="px-2 text-xs font-medium text-muted-foreground">
      {{ label }}
    </Label>
    <Select :model-value="value" @update:model-value="handleChange" @update:open="onOpenChange">
      <SelectTrigger
        :id="name"
        class="w-full rounded-md"
        :size="size"
        :aria-invalid="!!errorMessage"
        v-bind="$attrs"
      >
        <SelectValue :placeholder="placeholder" class="data-[placeholder]:text-muted-foreground/40" />
      </SelectTrigger>
      <SelectContent @scroll.passive="onScrolledToBottom">
        <div v-if="status === 'pending'" class="px-3 py-2 text-xs text-muted-foreground">
          Ładuję dane...
        </div>
        <SelectItem
          v-for="option in mergedOptions"
          :key="resolveOption(option, optionValue ?? optionLabel)"
          :value="resolveOption(option, optionValue ?? optionLabel)"
          :disabled="isOptionDisabled(option)"
        >
          {{ resolveOption(option, optionLabel) }}
        </SelectItem>
      </SelectContent>
    </Select>
    <p v-if="errorMessage" class="text-xs text-destructive">{{ errorMessage }}</p>
  </div>
</template>