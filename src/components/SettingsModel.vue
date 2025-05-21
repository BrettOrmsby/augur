<template>
  <Dialog
    v-model:visible="UIStates.isSettingsOpen"
    modal
    header="Settings"
    style="max-width: 300px; width: 100%; margin: 0 var(--block-space)"
  >
    <template #header>
      <div class="header-container">
        <SettingsIcon />
        <span class="p-dialog-title">Settings</span>
      </div>
    </template>
    <div class="form-container">
      <span id="order">Order</span>
      <Select
        v-model="settings.order"
        :options="orders"
        placeholder="Order"
        aria-labelledby="order"
      />

      <span id="direction">Direction</span>
      <Select
        v-model="settings.direction"
        :options="directions"
        placeholder="Direction"
        aria-labelledby="direction"
      />

      <span id="price">Price</span>
      <Select
        v-model="settings.price"
        :options="prices"
        placeholder="Price"
        aria-labelledby="price"
      />
    </div>
    <div class="footer">
      <Button
        type="button"
        label="Close"
        severity="secondary"
        @click="() => (UIStates.isSettingsOpen = false)"
      ></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Button, Dialog, Select } from 'primevue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { useScryfallData } from '@/composables/useScryfallData'
import { settings, UIStates } from '@/store/store'

const { fetchScryfallData } = useScryfallData()
const route = useRoute()

const orders = [
  'name',
  'set',
  'released',
  'rarity',
  'color',
  'usd',
  'tix',
  'eur',
  'cmc',
  'power',
  'toughness',
  'edhrec',
  'penny',
  'artist',
  'review'
].sort()

const directions = ['auto', 'asc', 'desc']
const prices = ['usd', 'usd_foil', 'usd_etched', 'eur', 'eur_foil', 'tix']

const startingSettings = ref({ ...settings.value })

watch(
  () => UIStates.isSettingsOpen,
  (value) => {
    if (value) {
      startingSettings.value = { ...settings.value }
    } else if (
      startingSettings.value.direction !== settings.value.direction ||
      startingSettings.value.order !== settings.value.order
    ) {
      // reload the data with changed settings
      const query = {
        q: route.query.q?.toString() ?? '',
        page: isNaN(Number(route.query.page)) ? 1 : Number(route.query.page)
      }
      fetchScryfallData(query)
    }
  }
)
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--inline-space);
}
.header-container svg {
  height: var(--p-dialog-title-font-size);
  width: var(--p-dialog-title-font-size);
}
.footer {
  display: flex;
  justify-content: flex-end;
}
.form-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: var(--block-space) var(--inline-space);
  margin-bottom: var(--block-space);
}
</style>
