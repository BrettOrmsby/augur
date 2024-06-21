<template>
  <Toolbar>
    <template #start>
      <RouterLink :to="{ name: 'search', query: { page: Number(route.query.page || 1) - 1 } }">
        <Button
          label="Previous"
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
        size="small"
        class="settings"
        @click="() => (UIStates.isSettingsOpen = true)"
      >
        <template #icon="iconClass"><SettingsIcon :class="iconClass.class" /></template>
      </Button>
      <Button
        aria-label="Clipboard"
        size="small"
        :badge="clipboard.cards.length.toString()"
        @click="() => (UIStates.isClipBoardOpen = true)"
      >
        <template #icon="iconClass">
          <ClipboardIcon :class="iconClass.class" />
        </template>
      </Button>
    </template>
    <template #end>
      <RouterLink :to="{ name: 'search', query: { page: Number(route.query.page || 1) + 1 } }">
        <Button
          label="Next"
          iconPos="right"
          size="small"
          severity="secondary"
          :disabled="!data?.has_more"
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
import List from 'scryfall-client/dist/models/list'
import Card from 'scryfall-client/dist/models/card'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { useRoute } from 'vue-router'
import { UIStates, clipboard } from '@/store/store'
import { computed } from 'vue'

defineProps<{ data: null | List<Card> }>()

const route = useRoute()
const isPrevPage = computed(() => !isNaN(Number(route.query.page)) && Number(route.query.page) > 1)
</script>

<style scoped>
.p-toolbar {
  margin-top: 1em;
}

.settings {
  margin-right: var(--inline-space);
}

.p-button:has(.p-badge) :deep(.p-button-label) {
  display: none;
}
</style>
