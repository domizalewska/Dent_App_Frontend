<script setup lang="ts" generic="T">
import { useField } from 'vee-validate'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { usePaginatedAPI } from '~/composables/useAPI'
import type { PaginatedResponse, PaginatedResult } from '~/types'

interface Props {
  name: string
  api: string
  apiKey: string
  hideLabel?: boolean
  optionValue: (option: T) => string
  optionLabel: (option: T) => string
  optionAvatar?: (option: T) => string | undefined
  placeholder?: string
  emptyText?: string
  size?: 'xs' | 'sm' | 'default'
  label?: string
  requiredMark?: boolean
  immediateFetch?: boolean
  withPagination?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Wybierz...',
  size: 'default',
  emptyText: 'Wystąpił błąd',
  label: '',
  requiredMark: false,
  immediateFetch: true,
})

const { paramsData } = usePagination({
  initialPerPage: 50,
})

const serverData = ref<T[] | PaginatedResponse<T>>()

const { value, errorMessage } = useField<string[]>(() => props.name)

usePaginatedAPI<T>(props.api, {
  key: props.apiKey,
  immediate: props.immediateFetch,
  params: props.withPagination ? paramsData : undefined,
  onResponse: ({ response }: { response: { _data: unknown } }) => {
    if (!props.withPagination) {
      serverData.value = response._data as T[]
      return
    }
    const data = response._data as PaginatedResult<T>
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

const options = computed(() => {
  if (!serverData.value) return []
  if (Array.isArray(serverData.value)) return serverData.value as T[]
  return (serverData.value as PaginatedResponse<T>).data ?? []
})

const selectedLabels = computed(() =>
  (value.value ?? []).map((v) => {
    const option = options.value.find((o) => props.optionValue(o) === v)
    return option ? props.optionLabel(option) : v
  }),
)
</script>

<template>
  <div>
    <label v-if="label && !hideLabel" :for="name" class="text-sm"
    >{{ label }}{{ requiredMark ? '*' : '' }}</label
    >
    <Combobox v-model="value" multiple>
      <ComboboxAnchor as-child>
        <ComboboxTrigger as-child>
          <Button
            variant="outline"
            :size="size"
            :class="[
              'justify-between',
              size === 'xs' ? 'w-[180px]' : size === 'sm' ? 'w-[220px]' : 'w-[280px]',
            ]"
          >
            <span class="truncate">
              {{ selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder }}
            </span>
            <ChevronsUpDownIcon class="opacity-50" />
          </Button>
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxList
        :class="size === 'xs' ? 'w-[180px]' : size === 'sm' ? 'w-[220px]' : 'w-[280px]'"
        align="start"
      >
        <ComboboxInput :placeholder="placeholder" />
        <ComboboxEmpty>{{ emptyText }}</ComboboxEmpty>
          <ComboboxGroup>
          <ComboboxItem
            v-for="option in options"
            :key="optionValue(option)"
            :value="optionValue(option)"
          >
            <div
              class="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
              :data-selected="(value ?? []).includes(optionValue(option))"
            >
              <CheckIcon class="size-3.5 text-current" />
            </div>
            <Avatar v-if="optionAvatar" class="size-5">
              <AvatarImage :src="optionAvatar(option) ?? ''" />
              <AvatarFallback>{{ optionLabel(option)[0] }}</AvatarFallback>
            </Avatar>
            {{ optionLabel(option) }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
      <span v-if="errorMessage" class="text-xs">{{ errorMessage }}</span>
    </Combobox>
  </div>
</template>
