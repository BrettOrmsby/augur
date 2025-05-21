<template>
  <Button label="Select Page" severity="secondary" size="small" @click="addPage" :disabled="!data">
    <template #icon="iconClass"><SelectPage :class="iconClass.class" /></template>
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'primevue'
import SelectPage from '@/components/icons/SelectPage.vue'
import { useScryfallData } from '@/composables/useScryfallData'
import { clipboard } from '@/store/store'

const { data } = useScryfallData()
const addPage = () => {
  if (!data.value) return
  data.value.cards.forEach((card) => {
    if (!clipboard.value.cards.includes(card.name)) {
      clipboard.value.cards.push(card.name)
    }
  })
}
</script>

<style scoped></style>
