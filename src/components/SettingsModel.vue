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
        v-model="updatedSettings.order"
        :options="orderOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Order"
        aria-labelledby="order"
      />

      <span id="direction">Direction</span>
      <Select
        v-model="updatedSettings.direction"
        :options="directionOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Direction"
        aria-labelledby="direction"
      />

      <span id="price">Price</span>
      <Select
        v-model="updatedSettings.price"
        :options="priceOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Price"
        aria-labelledby="price"
      />
    </div>
    <div class="footer">
      <Button label="Cancel" severity="secondary" @click="close"></Button>
      <Button label="Apply Changes" @click="applyChanges"></Button>
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

const orderOptions = [
  { value: 'name', label: 'Name' },
  { value: 'released', label: 'Release Date' },
  { value: 'set', label: 'Set/Number' },
  { value: 'rarity', label: 'Rarity' },
  { value: 'color', label: 'Color' },
  { value: 'usd', label: 'Price: USD' },
  { value: 'tix', label: 'Price: TIX' },
  { value: 'eur', label: 'Price: EUR' },
  { value: 'cmc', label: 'Mana Value' },
  { value: 'power', label: 'Power' },
  { value: 'toughness', label: 'Toughness' },
  { value: 'artist', label: 'Artist' },
  { value: 'edhrec', label: 'EDHREC Rank' },
  { value: 'review', label: 'Set Review' },
  { value: 'penny', label: 'Penny' }
]

const directionOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'asc', label: 'Asc' },
  { value: 'desc', label: 'Desc' }
]
const priceOptions = [
  { value: 'usd', label: 'USD' },
  { value: 'usd_etched', label: 'USD Etched' },
  { value: 'usd_foil', label: 'USD Foil' },
  { value: 'eur', label: 'EUR' },
  { value: 'eur_foil', label: 'EUR Foil' },
  { value: 'tix', label: 'TIX' }
]

const close = () => (UIStates.isSettingsOpen = false)

const startingSettings = ref<typeof settings.value>({ ...settings.value })
const updatedSettings = ref<typeof settings.value>({ ...settings.value })

const applyChanges = () => {
  Object.assign(settings.value, updatedSettings.value)
  close()
  // data needs to be reloaded if order or direction are changed
  if (
    startingSettings.value.direction !== updatedSettings.value.direction ||
    startingSettings.value.order !== updatedSettings.value.order
  ) {
    const query = {
      q: route.query.q?.toString() ?? '',
      page: isNaN(Number(route.query.page)) ? 1 : Number(route.query.page)
    }
    fetchScryfallData(query)
  }
}
watch(
  () => UIStates.isSettingsOpen,
  (value) => {
    if (value) {
      startingSettings.value = { ...settings.value }
      updatedSettings.value = { ...settings.value }
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
  gap: var(--inline-space);
}
.form-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: var(--block-space) var(--inline-space);
  margin-bottom: var(--block-space);
}
</style>
