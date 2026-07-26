<script setup lang="ts" generic="T">
import { XIcon, ChevronsUpDownIcon, CheckIcon } from 'lucide-vue-next'

interface Props {
  api: string
  optionValue: (option: T) => string
  optionLabel: (option: T) => string
  optionAvatar?: (option: T) => string | undefined
  placeholder?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Wybierz...',
})

const model = defineModel<string[]>({ default: () => [] })

const { data } = useAPI<{ data: T[] }>(props.api)
const open = ref(false)

const options = computed(() => data.value?.data ?? [])

const selectedOptions = computed(() =>
  options.value.filter((o) => model.value.includes(props.optionValue(o))),
)

const isSelected = (option: T) => model.value.includes(props.optionValue(option))

function toggle(option: T) {
  const val = props.optionValue(option)
  model.value = model.value.includes(val)
    ? model.value.filter((v) => v !== val)
    : [...model.value, val]
}

function remove(e: MouseEvent, val: string) {
  e.stopPropagation()
  model.value = model.value.filter((v) => v !== val)
}
</script>

<template>
  <div class="w-full space-y-1.5">
    <Label v-if="label" class="px-2 text-xs font-medium text-muted-foreground">{{ label }}</Label>

    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <div
          role="combobox"
          class="min-h-9 w-full border border-input bg-transparent rounded-xl px-3 py-1.5 flex flex-wrap gap-1.5 items-center cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <span v-if="selectedOptions.length === 0" class="text-sm text-muted-foreground flex-1">
            {{ placeholder }}
          </span>
          <span
            v-for="option in selectedOptions.slice(0, 3)"
            :key="optionValue(option)"
            class="flex items-center gap-1.5 bg-accent text-xs pl-1 pr-1.5 py-0.5 rounded-full"
          >
            <Avatar v-if="optionAvatar" class="size-4">
              <AvatarImage :src="optionAvatar(option) ?? ''" />
              <AvatarFallback class="text-[8px]">{{ optionLabel(option)[0] }}</AvatarFallback>
            </Avatar>
            {{ optionLabel(option) }}
            <button
              type="button"
              class="text-muted-foreground hover:text-foreground"
              @click="remove($event, optionValue(option))"
            >
              <XIcon class="size-3" />
            </button>
          </span>
          <span v-if="selectedOptions.length > 3" class="text-xs text-muted-foreground">
            +{{ selectedOptions.length - 3 }}
          </span>
          <ChevronsUpDownIcon class="size-4 shrink-0 opacity-50 ml-auto" />
        </div>
      </PopoverTrigger>
      <PopoverContent class="p-0 w-[--radix-popover-trigger-width]" align="start">
        <Command>
          <CommandInput placeholder="Szukaj..." />
          <CommandList class="[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
            <CommandEmpty>Brak wyników</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="option in options"
                :key="optionValue(option)"
                :value="optionLabel(option)"
                class="gap-2"
                @select="toggle(option)"
              >
                <Avatar v-if="optionAvatar" class="size-6">
                  <AvatarImage :src="optionAvatar(option) ?? ''" />
                  <AvatarFallback class="text-[10px]">{{ optionLabel(option)[0] }}</AvatarFallback>
                </Avatar>
                <span class="flex-1">{{ optionLabel(option) }}</span>
                <CheckIcon v-if="isSelected(option)" class="size-4 text-primary" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>
