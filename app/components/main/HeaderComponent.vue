<script setup lang="ts">
import ColorPicker from '~/components/main/ColorPicker.vue'

const { user } = useAuth()
</script>
<template>
  <div class="flex gap-2 items-center justify-center cursor-pointer">
    <ClientOnly>
      <MessageButton />
      <NotificationOverlayButton />
      <ColorPicker />
      <AvatarComponent v-if="user" class="flex items-start" :user="user" />
    </ClientOnly>
  </div>
</template>
