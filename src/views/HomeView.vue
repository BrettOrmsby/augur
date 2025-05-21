<template>
  <main>
    <EclipseIcon class="logo" />
    <h1><strong>Augur</strong>: a <strong>Brewers</strong> MTG Search Engine</h1>
    <InputGroup>
      <InputText
        v-model="searchPrompt"
        placeholder="Search"
        aria-label="Search"
        size="large"
        @keyup.enter="search"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <Button aria-label="Search" @click="search" v-tooltip.bottom="generateTooltip('Search')">
        <template #icon="icon">
          <SearchIcon :class="icon.class" />
        </template>
      </Button>
    </InputGroup>
    <div class="button-container">
      <a
        href="https://scryfall.com/docs/syntax"
        target="_blank"
        rel="noopener"
        style="text-decoration: none"
      >
        <Button label="Scryfall Syntax" severity="secondary">
          <template #icon="iconClass">
            <OpenLinkIcon :class="iconClass.class" />
          </template>
        </Button>
      </a>
      <DarkModeToggle />
    </div>
    <h2>Features</h2>
    <div class="feature-container">
      <Card>
        <template #header>
          <div class="icon-container"><SearchCheckIcon /></div>
        </template>
        <template #title>Scryfall-Powered</template>
        <template #content>
          <p>
            Use the powerful
            <a href="https://scryfall.com/" target="_blank">Scryfall</a> search syntax.
          </p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <ClipboardIcon />
          </div>
        </template>
        <template #title>Clipboard</template>
        <template #content>
          <p>Save cards to the clipboard for seamless deck brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container"><PhoneIcon /></div>
        </template>
        <template #title>Mobile First</template>
        <template #content>
          <p>Designed for optimal use on mobile, enabling on-the-go brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <SettingsIcon />
          </div>
        </template>
        <template #title>Search Settings</template>
        <template #content>
          <p>Stop appending <code>sort:edhrec</code> to every query and save your search order.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container"><PiggyBankIcon /></div>
        </template>
        <template #title>Display Price</template>
        <template #content>
          <p>Keep track of card prices for budget-friendly brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container"><SunMoonIcon /></div>
        </template>
        <template #title>Dark and Light Modes</template>
        <template #content>
          <p>
            View in the [[<RouterLink to="/search?q=!%22Light+of+Day%22">light of day</RouterLink>]]
            or absolute [[<RouterLink to="/search?q=!Darkness">darkness</RouterLink>]].
          </p>
        </template>
      </Card>
    </div>
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Card, InputGroup, InputText } from 'primevue'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import TheFooter from '@/components/TheFooter.vue'
import ClipboardIcon from '@/components/icons/ClipboardIcon.vue'
import EclipseIcon from '@/components/icons/EclipseIcon.vue'
import OpenLinkIcon from '@/components/icons/OpenLinkIcon.vue'
import PiggyBankIcon from '@/components/icons/PiggyBankIcon.vue'
import PhoneIcon from '@/components/icons/PhoneIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import SearchCheckIcon from '@/components/icons/SearchCheckIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import SunMoonIcon from '@/components/icons/SunMoonIcon.vue'
import generateTooltip from '@/utils/generateTooltip'

const router = useRouter()

const searchPrompt = ref('')

const search = () => {
  router.push({ name: 'search', query: { q: searchPrompt.value } })
}
</script>

<style scoped>
main {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 3rem;
  height: 3rem;
}
h1 {
  margin-top: var(--inline-space);
  text-align: center;
  font-weight: 300;
}
strong {
  font-weight: 800;
}

.p-inputgroup {
  max-width: 400px;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--inline-space);
  margin-top: var(--inline-space);
}

.feature-container {
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--block-space);
}
.p-card {
  background-color: var(--p-content-background);
  border: 1px solid var(--p-content-border-color);
  max-width: 250px;
  width: 100%;
}
.p-card :deep(.icon-container) {
  background: var(--p-primary-color);
  color: var(--p-content-background);
  padding: var(--inline-space);
  border-radius: var(--p-border-radius-md);
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-card :deep(p) {
  color: var(--p-card-subtitle-color);
  margin: 0;
  line-height: 1.2rem;
}
.p-card :deep(a) {
  color: var(--p-button-link-color);
  text-decoration: none;
  transition: var(--p-form-field-transition-duration);
}
.p-card :deep(a:hover) {
  color: var(--p-button-link-hover-color);
  text-decoration: underline;
}
.p-card :deep(code) {
  font-family: inherit;
  background: var(--p-form-field-filled-background);
  color: var(--p-form-field-filled-color);
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: var(--p-content-border-radius);
}

:deep(.p-card-body) {
  padding-top: var(--inline-space);
}
:deep(.p-card-header) {
  padding: var(--p-card-body-padding) var(--p-card-body-padding) 0 var(--p-card-body-padding);
}
</style>
