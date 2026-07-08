<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
import { ProfileRoutes } from '~/types/routes'

const props = defineProps<{ uuid: string }>()

const router = useRouter()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="rounded-full cursor-pointer"
    @click.stop="router.push(ProfileRoutes.PROFILE(props.uuid))"
  >
    <ExternalLink class="size-4" />
  </Button>
</template>
