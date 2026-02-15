<script setup lang="ts">
interface Props {
  name: string;
  link?: string;
}

defineProps<Props>();
</script>
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem class="hidden md:block">
        <BreadcrumbLink :href="link"> {{ name }} </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
