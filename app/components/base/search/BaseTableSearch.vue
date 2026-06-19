<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { useDebounceFn } from '@vueuse/core';
import { onMounted, ref } from 'vue';

interface Props {
  modelValue?: string;
}

const props = defineProps<Props>()
const emit = defineEmits<{ search: [value: string | null] }>()

const searchText = ref<string | number>('')

const debounceInput = useDebounceFn((value: string | number) => {
  emit('search', value ? String(value) : null)
}, 1500)

onMounted(() => {
  if (props.modelValue) searchText.value = props.modelValue
})
</script>

<template>
  <ButtonGroup>
    <Input
      v-model="searchText"
      v-bind="$attrs"
      size="small"
      placeholder="Wyszukaj..."
      @update:model-value="debounceInput"
      @keyup.enter="emit('search', searchText ? String(searchText) : null)"
    />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>