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
    <Message
      severity="warn"
      v-if="!isMessageClosed"
      @close="() => (messageClosed.isClosed = true)"
      closable
      >Changing settings will not reload the search.</Message
    >
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
import { settings, UIStates } from '@/store/store'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Select from 'primevue/select'
import Message from 'primevue/message'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import { ref } from 'vue'

const isMessageClosed = ref(false)

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

// Delay the hiding of the message to keep the close animation
const messageClosed = useLocalStorage('messageClosed', { isClosed: false })
watch(
  () => UIStates.isSettingsOpen,
  () => {
    if (messageClosed.value.isClosed) {
      isMessageClosed.value = true
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
.p-message {
  margin-bottom: var(--block-space);
}
</style>
