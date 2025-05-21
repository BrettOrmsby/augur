<template>
  <Dialog
    v-model:visible="UIStates.isClipBoardOpen"
    modal
    header="Settings"
    style="max-width: 600px; width: 100%; margin: 0 var(--block-space)"
  >
    <template #header>
      <div class="header-container">
        <ClipboardIcon />
        <span class="p-dialog-title">Clipboard</span>
      </div>
    </template>

    <div class="model-container">
      <SkeletonCard v-if="isLoading || isError || selectedCard === ''" vertical />
      <MTGCard v-else-if="data" :card="data" vertical />

      <Listbox
        v-model="selectedCard"
        :options="sortedClipboard"
        filter
        filter-placeholder="Search"
        scrollHeight="19.5rem"
      />
    </div>

    <template #footer>
      <Button
        label="Close"
        severity="secondary"
        @click="() => (UIStates.isClipBoardOpen = false)"
      ></Button>
      <ClearClipboardButton />
      <CopyClipboardButton />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import scryfall from 'scryfall-client'
import type Card from 'scryfall-client/dist/models/card'
import { Button, Dialog, Listbox } from 'primevue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import ClearClipboardButton from '@/components/ClearClipboardButton.vue'
import CopyClipboardButton from '@/components/CopyClipboardButton.vue'
import MTGCard from '@/components//MTGCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { clipboard, UIStates } from '@/store/store'

const isLoading = ref(false)
const isError = ref(false)
const data = ref<Card>()
const selectedCard = ref('')

const sortedClipboard = computed(() => [...clipboard.value.cards].sort())

const loadCard = async (card: string) => {
  isLoading.value = true
  isError.value = false
  try {
    data.value = await scryfall.getCard(card, 'exactName')
  } catch (e) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(selectedCard, (value) => value && loadCard(value))

watch(
  () => UIStates.isClipBoardOpen,
  () => (selectedCard.value = sortedClipboard.value[0] || '')
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
.model-container {
  margin-top: 2px;
  align-items: flex-start;
  justify-content: center;
  gap: var(--block-space);
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 3px;
}

:deep(.p-dialog-footer) {
  padding-top: var(--p-overlay-modal-padding);
}
</style>
