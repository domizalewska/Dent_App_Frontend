<script setup lang="ts">
</script>
<template>
  <div
class="flex flex-col gap-1 overflow-auto border border-border rounded-xl mb-4
">
    <div>
      <slot name="top" />
    </div>
    <div class="flex flex-row justify-between flex-wrap px-4 gap-2">
      <div>
        <slot name="left" />
      </div>
      <div>
        <slot name="right" />
      </div>
    </div>
    <div>
      <slot name="bottom" />
    </div>
  </div>
</template>