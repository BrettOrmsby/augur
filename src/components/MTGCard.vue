<template>
  <DeferredContent>
    <img
      v-show="isLoaded"
      :src="cardImage"
      :alt="card.name"
      @click="toggleClipboard"
      @load="() => (isLoaded = true)"
      class="card"
      :class="{ isInClipboard: clipboard.cards.includes(card.name) }"
    />
    <div v-show="!isLoaded" class="card">
      <div class="spinner"></div>
    </div>
    <Toolbar :class="{ vertical }">
      <template #start>
        <a :href="card.scryfall_uri" target="_blank">
          <Button aria-label="Open In Scryfall" size="small" severity="secondary">
            <template #icon="iconClass">
              <OpenLinkIcon :class="iconClass.class" />
            </template>
          </Button>
        </a>
      </template>
      <template #center
        ><Tag
          :value="formatter.format(Number(card.prices[settings.price]))"
          v-if="card.prices[settings.price]"
        />
        <Tag value="..." v-else />
      </template>
      <template #end>
        <Button
          aria-label="Flip Card"
          size="small"
          v-if="vertical || isFlipCard"
          @click="flipCard"
          :disabled="!isFlipCard"
        >
          <template #icon="iconClass">
            <RotateIcon :class="iconClass.class" />
          </template>
        </Button>
      </template>
    </Toolbar>
  </DeferredContent>
</template>

<script lang="ts" setup>
import type Card from 'scryfall-client/dist/models/card'
import DeferredContent from 'primevue/deferredcontent'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import Tag from 'primevue/tag'
import OpenLinkIcon from '@/components/icons/OpenLinkIcon.vue'
import RotateIcon from '@/components/icons/RotateIcon.vue'
import { computed } from 'vue'
import { ref } from 'vue'
import { clipboard, settings } from '@/store/store'

const props = defineProps<{ card: Card; vertical?: boolean }>()
const isLoaded = ref(false)
const cardImage = ref(props.card.getImage())

const isFlipCard = computed(
  () =>
    props.card._isDoublesided ||
    (props.card.card_faces.length === 2 &&
      [
        'flip',
        'transform',
        'modal_dfc',
        'battle',
        'double_faced_token',
        'reversible_card'
      ].includes(props.card.layout))
)

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const flipCard = () => {
  isLoaded.value = false
  cardImage.value =
    cardImage.value === props.card.getImage()
      ? props.card.card_faces[1].image_uris?.png || props.card.getImage()
      : props.card.getImage()
}

const toggleClipboard = () => {
  if (clipboard.value.cards.includes(props.card.name)) {
    clipboard.value.cards.splice(clipboard.value.cards.indexOf(props.card.name), 1)
  } else {
    clipboard.value.cards.push(props.card.name)
  }
}
</script>

<style scoped>
.card {
  display: block;
  width: 100%;
  border-radius: 5%;
  aspect-ratio: 745 / 1040;
  margin-bottom: var(--inline-space);
  background-color: var(--p-content-background);
  color: var(--p-surface-400);
  text-align: center;
  cursor: pointer;
}
.card::before {
  padding: var(--block-space);
  display: block;
}
.card.isInClipboard {
  outline: solid 2px var(--p-button-primary-background);
  outline-offset: 2px;
}

.card:has(.spinner) {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--p-toolbar-border-color);
}
.spinner {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 0.5rem solid var(--p-button-primary-background);
  animation:
    spinner-bulqg1 0.8s infinite linear alternate,
    spinner-oaa3wk 1.6s infinite linear;
}

.vertical {
  flex-direction: column;
}
.vertical :deep(:is(.p-button, a, .p-toolbar-start, .p-toolbar-end)) {
  width: 100%;
}
.vertical :deep(.p-toolbar-start) {
  order: 1;
}
.vertical :deep(.p-toolbar-end) {
  order: 2;
}

@keyframes spinner-bulqg1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }

  12.5% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }

  62.5% {
    clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
  }

  75% {
    clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
  }

  100% {
    clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
  }
}

@keyframes spinner-oaa3wk {
  0% {
    transform: scaleY(1) rotate(0deg);
  }

  49.99% {
    transform: scaleY(1) rotate(135deg);
  }

  50% {
    transform: scaleY(-1) rotate(0deg);
  }

  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
