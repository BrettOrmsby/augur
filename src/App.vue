<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { RouterView } from 'vue-router'
// TODO: batch search pages by 60 or 75
</script>

<template>
  <Toast position="top-center" />
  <ConfirmDialog style="margin: var(--block-space)" />

  <RouterView />
</template>

<style scoped></style>
