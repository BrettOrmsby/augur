<template>
  <div>
    <Skeleton
      borderRadius="5%"
      width="100%"
      style="aspect-ratio: 745 / 1040; margin-bottom: var(--inline-space)"
      height="auto"
    ></Skeleton>
    <Skeleton
      borderRadius="var(--p-toolbar-border-radius)"
      width="100%"
      :style="toolbarHeight"
    ></Skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{ vertical?: boolean }>()

const toolbarHeight = computed(() =>
  props.vertical
    ? `height: calc(
          (var(--p-toolbar-padding) * 2) + 5rem + (4 * var(--p-button-sm-padding-y)) + 2px
        );`
    : `height: calc(
          (var(--p-toolbar-padding) * 2) + 2rem + (2 * var(--p-button-sm-padding-y)) + 4px
        );
        `
)
</script>

<style scoped></style>
