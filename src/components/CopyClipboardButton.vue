<template>
  <Button v-if="showText" label="Copy" @click="copyClipboard"></Button>
  <Button
    v-else
    aria-label="Copy Clipboard"
    v-tooltip.bottom="generateTooltip('Copy Clipboard')"
    size="small"
    @click="copyClipboard"
  >
    <template #icon="iconClass"><CopyIcon :class="iconClass.class" /></template>
  </Button>
</template>

<script lang="ts" setup>
import { Button } from 'primevue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import { useClipboard } from '@/composables/useClipboard'
import { clipboard } from '@/store/store'
import generateTooltip from '@/utils/generateTooltip'

const { showText = true } = defineProps<{ showText?: boolean }>()

const { copy } = useClipboard()
const copyClipboard = () => {
  const cards = clipboard.value.cards
    .sort()
    .map((card) => `1 ${card}`)
    .join('\n')

  const messages = {
    success: {
      summary: 'Clipboard Copied',
      detail: 'Your cards have been copied to the clipboard.'
    },
    error: {
      summary: 'Failed to Copy',
      detail: 'Your cards were unable to be copied to the clipboard.'
    }
  }
  copy(cards, messages)
}
</script>

<style scoped></style>
