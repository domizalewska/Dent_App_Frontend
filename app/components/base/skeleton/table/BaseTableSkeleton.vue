<script setup lang="ts">
interface Props {
  columns?: number
  rows?: number
  hasActions?: boolean
}

withDefaults(defineProps<Props>(), {
  columns: 3,
  rows: 5,
  hasActions: true,
})
</script>

<template>
  <div class="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="i in columns"
            :key="i"
            class="font-normal border-b border-border"
          >
            <Skeleton class="h-4 w-24" />
          </TableHead>
          <TableHead v-if="hasActions" class="font-normal border-b border-border" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in rows" :key="row" class="border-b border-border">
          <TableCell v-for="col in columns" :key="col">
            <Skeleton class="h-4 w-full" />
          </TableCell>
          <TableCell v-if="hasActions">
            <Skeleton class="h-8 w-8 rounded-full" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
