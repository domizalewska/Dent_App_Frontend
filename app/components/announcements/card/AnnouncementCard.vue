<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Announcement, User } from '~/types'
import { formatDateToString } from '~/utils/formatDate'
import BaseUserAvatar from '~/components/base/avatar/BaseUserAvatar.vue'
import AnnouncementsDialog from '~/components/announcements/dialog/AnnouncementsDialog.vue'
import { useDialog } from '~/composables/useDialog'

interface Props {
  announcement: Announcement
  author: User
}

const props = defineProps<Props>()

const { open } = useDialog()

const fullName = computed(() => `${props.author.first_name} ${props.author.last_name}`)

const publishedLabel = computed(() =>
  formatDateToString(props.announcement.published_at, 'd MMMM yyyy'),
)

function openEditDialog() {
  open(AnnouncementsDialog, { isEdit: true, initialValues: props.announcement })
}
</script>

<template>
  <div class="rounded-xl border border-border bg-card p-5">
    <div class="mb-2.5 flex items-start justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <BaseUserAvatar :user="props.author" />

        <div>
          <div class="text-sm font-medium text-foreground">{{ fullName }}</div>
          <div class="text-xs text-muted-foreground">
            <template v-if="props.author.job_position"
              >{{ props.author.job_position.name }} ·
            </template>
            opublikowano {{ publishedLabel }}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        class="size-7"
        aria-label="Więcej opcji"
        @click="openEditDialog"
      >
        <Icon icon="lucide:more-horizontal" class="size-4" />
      </Button>
    </div>

    <div class="mb-1.5 text-base font-semibold text-foreground">
      {{ announcement.title }}
    </div>

    <div class="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
      {{ announcement.content }}
    </div>
  </div>
</template>
