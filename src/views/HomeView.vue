<template>
  <main>
    <svg
      class="logo lucide lucide-eclipse"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a7 7 0 1 0 10 10" />
    </svg>
    <h1><strong>Augur</strong>: a <strong>Brewers</strong> MTG Search Engine</h1>
    <InputGroup>
      <InputText
        v-model="searchPrompt"
        placeholder="Search"
        aria-label="Search"
        size="large"
        @keyup.enter="search"
      />
      <Button aria-label="Search" @click="search">
        <template #icon="icon">
          <svg
            :class="icon.class"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </template>
      </Button>
    </InputGroup>
    <h2>Features</h2>
    <div class="feature-container">
      <Card>
        <template #header>
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search-check"
            >
              <path d="m8 11 2 2 4-4" />
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
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
            <svg
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
          </div>
        </template>
        <template #title>Clipboard</template>
        <template #content>
          <p>Save cards to the clipboard for seamless deck brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-smartphone"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          </div>
        </template>
        <template #title>Mobile First</template>
        <template #content>
          <p>Designed for optimal use on mobile, enabling on-the-go brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <svg
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
          </div>
        </template>
        <template #title>Search Settings</template>
        <template #content>
          <p>Stop appending <code>sort:edhrec</code> to every query and save your search order.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-piggy-bank"
            >
              <path
                d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"
              />
              <path d="M2 9v1c0 1.1.9 2 2 2h1" />
              <path d="M16 11h.01" />
            </svg>
          </div>
        </template>
        <template #title>Display Price</template>
        <template #content>
          <p>Keep track of card prices for budget-friendly brewing.</p>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-sun-moon"
            >
              <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.9 4.9 1.4 1.4" />
              <path d="m17.7 17.7 1.4 1.4" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.3 17.7-1.4 1.4" />
              <path d="m19.1 4.9-1.4 1.4" />
            </svg>
          </div>
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { ref } from 'vue'

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

.feature-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--block-space);
}
.p-card {
  background-color: var(--p-surface-900);
  border: 1px solid var(--p-content-border-color);
  max-width: 250px;
  width: 100%;
}
.p-card :deep(.icon-container) {
  background: var(--p-primary-color);
  color: var(--p-surface-900);
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
  background: var(--p-surface-700);
  color: var(--p-primary-300);
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
