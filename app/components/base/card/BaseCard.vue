<script setup lang="ts">
import BaseAcceptDeclineButtons from '~/components/base/buttons/BaseAcceptDeclineButtons.vue'

interface Props {
  cardTitle: string
  cardDescription?: string
  cardButtons?: boolean
}

defineProps<Props>()
</script>

<template>
  <Card class="flex min-w-0 flex-col gap-2">
    <CardHeader>
      <CardTitle><slot name="header" >
         {{cardTitle}}
      </slot></CardTitle>
      <CardDescription>
        <slot name="description" >
        {{ cardDescription }}
        </slot>
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <slot name="content"/>
    </CardContent>
    <CardFooter>
      <slot name="footer">
        <BaseAcceptDeclineButtons v-if="cardButtons" confirm-title="Zatwierdź" cancel-title="Anuluj" />
      </slot>
    </CardFooter>
  </Card>
</template>
