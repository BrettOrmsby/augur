<template>
  <Toolbar>
    <template #start>
      <RouterLink
        :to="{
          name: 'search',
          query: { page: Number(route.query.page || 1) - 1, q: route.query.q }
        }"
        style="text-decoration: none"
      >
        <Button
          label="Previous"
          v-tooltip.bottom="generateTooltip('Previous Page')"
          iconPos="left"
          size="small"
          severity="secondary"
          :disabled="!isPrevPage"
        >
          <template #icon="iconClass"><ChevronLeftIcon :class="iconClass.class" /></template>
        </Button>
      </RouterLink>
    </template>
    <template #center>
      <Button
        aria-label="Settings"
        v-tooltip.bottom="generateTooltip('Settings')"
        size="small"
        @click="() => (UIStates.isSettingsOpen = true)"
      >
        <template #icon="iconClass"><SettingsIcon :class="iconClass.class" /></template>
      </Button>
      <Button
        aria-label="Open Clipboard"
        v-tooltip.bottom="generateTooltip('Open Clipboard')"
        size="small"
        :badge="clipboard.cards.length.toString()"
        @click="() => (UIStates.isClipBoardOpen = true)"
      >
        <template #icon="iconClass">
          <ClipboardIcon :class="iconClass.class" />
        </template>
      </Button>
      <CopyClipboardButton :show-text="false" />
      <ClearClipboardButton :show-text="false" />
    </template>
    <template #end>
      <RouterLink
        :to="{
          name: 'search',
          query: { page: Number(route.query.page || 1) + 1, q: route.query.q }
        }"
        style="text-decoration: none"
      >
        <Button
          label="Next"
          v-tooltip.bottom="generateTooltip('Next Page')"
          iconPos="right"
          size="small"
          severity="secondary"
          :disabled="!isMore"
        >
          <template #icon="iconClass"><ChevronRightIcon :class="iconClass.class" /></template>
        </Button>
      </RouterLink>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { useRoute } from 'vue-router'
import { UIStates, clipboard } from '@/store/store'
import { computed } from 'vue'
import generateTooltip from '@/utils/generateTooltip'
import CopyClipboardButton from './CopyClipboardButton.vue'
import ClearClipboardButton from './ClearClipboardButton.vue'

defineProps<{ isMore: boolean }>()

const route = useRoute()
const isPrevPage = computed(() => !isNaN(Number(route.query.page)) && Number(route.query.page) > 1)
</script>

<style scoped>
.p-toolbar {
  margin-top: 1em;
  position: sticky;
  bottom: var(--inline-space);
  z-index: 10;
}

:deep(.p-toolbar-center) {
  display: flex;
  gap: var(--inline-space);
}

.p-button:has(.p-badge) :deep(.p-button-label) {
  display: none;
}

@media (max-width: 450px) {
  :deep(.p-button-label) {
    display: none;
  }
}
</style>
