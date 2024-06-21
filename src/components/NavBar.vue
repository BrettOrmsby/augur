<template>
  <Menubar :model="[]">
    <template #start>
      <div class="p-menubar-item logo-container">
        <div class="p-menubar-item-content">
          <RouterLink to="/" class="p-menubar-item-link">
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
          </RouterLink>
        </div>
      </div>
      <InputGroup>
        <InputText
          v-model="searchPrompt"
          placeholder="Search"
          aria-label="Search"
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
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref, watch } from 'vue'
import { reloadSearch } from '@/store/store'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const searchPrompt = ref('')

const search = () => {
  const prevParams = route.query.q
  if (prevParams === searchPrompt.value) {
    reloadSearch.value += 1
  } else {
    router.push({ name: 'search', query: { q: searchPrompt.value } })
  }
}

onMounted(() => (searchPrompt.value = route.query.q?.toString() || ''))
watch(
  () => route.query.q,
  (val) => {
    if (val) {
      searchPrompt.value = val?.toString()
    }
  }
)
</script>

<style scoped>
.p-menubar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
  border-left: none;
  border-right: none;
  border-top: none;
  z-index: 100;
}
.p-menubar {
  justify-content: center;
}
:deep(.p-menubar-root-list) {
  flex-wrap: nowrap;
}
svg {
  width: 1rem;
  height: 1rem;
}
.logo-container {
  margin-right: var(--p-menubar-gap);
}
.logo:hover {
  stroke: var(--p-button-primary-hover-background);
}
.p-inputtext,
.p-inputgroup,
:deep(.p-menubar-start) {
  width: 100%;
  max-width: 600px;
}
</style>
