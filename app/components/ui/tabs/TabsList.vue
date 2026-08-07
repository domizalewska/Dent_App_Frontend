<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsList } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"]; variant?: 'default' | 'line' }>()

const delegatedProps = reactiveOmit(props, "class", "variant")

provide('tabs-variant', computed(() => props.variant ?? 'default'))
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="delegatedProps"
    :class="cn(
      props.variant === 'line'
        ? 'flex w-full items-center border-b bg-transparent p-0 h-auto rounded-none gap-1'
        : 'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-0.75',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
