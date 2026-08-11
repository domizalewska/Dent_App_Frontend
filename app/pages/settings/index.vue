<script setup lang="ts">
definePageMeta({
  middleware: [() => navigateTo('/settings/notifications', { replace: true })],
})
</script>
