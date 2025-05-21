<template>
  <Button
    v-if="showText"
    label="Clear"
    severity="danger"
    @click="clear"
    :aria-expanded="isConfirmVisible"
    :aria-controls="isConfirmVisible ? 'confirm' : undefined"
  ></Button>
  <Button
    v-else
    severity="danger"
    aria-label="Clear Clipboard"
    v-tooltip.bottom="generateTooltip('Clear Clipboard')"
    size="small"
    @click="clear"
    :aria-expanded="isConfirmVisible"
    :aria-controls="isConfirmVisible ? 'confirm' : undefined"
  >
    <template #icon="iconClass"><TrashIcon :class="iconClass.class" /></template>
  </Button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Button, useConfirm } from 'primevue'
import TrashIcon from './icons/TrashIcon.vue'
import { UIStates, clipboard } from '@/store/store'
import generateTooltip from '@/utils/generateTooltip'

const { showText = true } = defineProps<{ showText?: boolean }>()

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
      label: 'Clear',
      severity: 'danger'
    },
    accept() {
      clipboard.value.cards = []
      UIStates.isClipBoardOpen = false
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

<style scoped></style>
