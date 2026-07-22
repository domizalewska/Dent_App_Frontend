<script setup lang="ts">
import type { MessageGroupType } from '~/types'

interface Props {
  selectedUuid?: string
}

defineProps<Props>()
const emit = defineEmits<{ select: [group: MessageGroupType] }>()

const { groups } = useMessages()
const search = ref('')

const filtered = computed(() =>
  groups.value.filter((g) => g.name.toLowerCase().includes(search.value.toLowerCase())),
)
</script>

<template>
  <div class="w-[220px] shrink-0 border-r border-border flex flex-col">
    <div class="px-3 py-3.5 border-b border-border">
      <Input v-model="search" placeholder="Szukaj..." class="h-8 text-xs" />
    </div>

    <p
      class="px-3 pt-3 pb-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide"
    >
      Ostatnie rozmowy
    </p>

    <ScrollArea class="flex-1">
      <button
        v-for="group in filtered"
        :key="group.uuid"
        type="button"
        class="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-accent"
        :class="selectedUuid === group.uuid ? 'bg-accent' : ''"
        @click="emit('select', group)"
      >
        <div class="relative shrink-0">
          <div class="flex items-center">
            <BaseUserAvatar
              v-for="(user, index) in group.users.slice(0, 2)"
              :key="user.uuid"
              :user="user"
              size="size-7"
              :class="index > 0 ? '-ml-2 ring-2 ring-background' : ''"
            />
          </div>
          <span
            v-if="group.unread_count && group.unread_count > 0"
            class="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
          >
            {{ group.unread_count > 9 ? '9+' : group.unread_count }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <p class="text-xs font-medium truncate">{{ group.name }}</p>
          <p class="text-[11px] text-muted-foreground truncate">
            {{ group.last_message?.message ?? 'Brak wiadomości' }}
          </p>
        </div>
      </button>
    </ScrollArea>
  </div>
</template>
