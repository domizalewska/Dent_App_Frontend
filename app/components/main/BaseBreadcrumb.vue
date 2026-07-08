<script setup lang="ts">
interface Crumb {
  name: string
  link?: string
}

interface Props {
  items: Crumb[]
}

const props = defineProps<Props>()
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <template v-for="(crumb, i) in props.items" :key="i">
        <BreadcrumbSeparator v-if="i > 0" />
        <BreadcrumbItem>
          <BreadcrumbLink v-if="crumb.link" :href="crumb.link">{{ crumb.name }}</BreadcrumbLink>
          <BreadcrumbPage v-else>{{ crumb.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
