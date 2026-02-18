<script setup lang="ts">
defineProps<{
  cardTitle?: string
  cardDescription?: string
  cardButtons?: boolean
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <slot name="header" />
      <CardTitle>{{ cardTitle }}</CardTitle>
      <CardDescription>
        {{ cardDescription }}
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <slot />
    </CardContent>
    <CardFooter>
      <BaseAcceptDeclineButtons v-if="cardButtons" />
    </CardFooter>
  </Card>
</template>
