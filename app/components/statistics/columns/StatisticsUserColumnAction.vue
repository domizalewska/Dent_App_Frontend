<script setup lang="ts">
import { ChevronsRight } from 'lucide-vue-next'
import { StatisticsRoutes } from '~/types/routes'

const props = defineProps<{ uuid: string }>()

const router = useRouter()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="rounded-full cursor-pointer"
    @click.stop="router.push(StatisticsRoutes.DETAILS(props.uuid))"
  >
    <ChevronsRight class="size-4" />
  </Button>
</template>
