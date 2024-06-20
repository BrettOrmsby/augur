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
          <template #icon="iconClass">
            <svg
              :class="iconClass.class"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </template>
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
        <template #icon="iconClass">
          <svg
            :class="iconClass.class"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-settings"
          >
            <path
              d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </template>
      </Button>
      <Button
        aria-label="Clipboard"
        size="small"
        :badge="clipboard.cards.length.toString()"
        @click="() => (UIStates.isClipBoardOpen = true)"
      >
        <template #icon="iconClass">
          <svg
            :class="iconClass.class"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-clipboard-check"
          >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="m9 14 2 2 4-4" />
          </svg>
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
          <template #icon="iconClass">
            <svg
              :class="iconClass.class"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </template>
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
