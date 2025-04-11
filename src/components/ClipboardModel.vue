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
      <Button
        label="Clear"
        severity="danger"
        @click="clear"
        :aria-expanded="isConfirmVisible"
        :aria-controls="isConfirmVisible ? 'confirm' : undefined"
      ></Button>
      <Button label="Copy" @click="copy"></Button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { clipboard, UIStates } from '@/store/store'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Listbox from 'primevue/listbox'
import { ref } from 'vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { watch } from 'vue'
import scryfall from 'scryfall-client'
import type Card from 'scryfall-client/dist/models/card'
import MTGCard from './MTGCard.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

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

const toast = useToast()
const copy = async () => {
  try {
    await navigator.clipboard.writeText(
      clipboard.value.cards
        .sort()
        .map((card) => `1 ${card}`)
        .join('\n')
    )
    toast.add({
      severity: 'success',
      summary: 'Clipboard Copied',
      detail: 'Your cards have been copied to the clipboard.',
      life: 3000
    })
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Failed to Copy',
      detail: 'Your cards were unable to be copied to the clipboard.',
      life: 3000
    })
  }
}

const confirm = useConfirm()
const isConfirmVisible = ref(false)
const clear = () => {
  confirm.require({
    message: 'Are you sure you want to clear your clipboard? This action cannot be undone.',
    header: 'Confirm Clearing',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary'
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept() {
      clipboard.value.cards = []
      UIStates.isClipBoardOpen = false
      selectedCard.value = ''
    },
    onShow: () => {
      isConfirmVisible.value = true
    },
    onHide: () => {
      isConfirmVisible.value = false
    }
  })
}
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
