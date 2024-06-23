<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'

useDark({
  selector: ':root',
  valueDark: 'app-dark',
  valueLight: 'app-light'
})
</script>

<template>
  <Toast position="top-center" />
  <ConfirmDialog style="margin: var(--block-space)" />

  <RouterView />
</template>

<style scoped></style>
