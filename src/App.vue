<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast position="top-center" />
  <ConfirmDialog style="margin: var(--block-space)" />
  <header>
    <NavBar />
  </header>

  <RouterView />
</template>

<style scoped></style>
