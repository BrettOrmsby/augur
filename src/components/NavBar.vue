<template>
  <Menubar :model="[]">
    <template #start>
      <div class="p-menubar-item logo-container" v-tooltip.bottom="generateTooltip('Home')">
        <div class="p-menubar-item-content">
          <RouterLink to="/" class="p-menubar-item-link">
            <EclipseIcon class="logo" />
          </RouterLink>
        </div>
      </div>
      <InputGroup>
        <InputText
          v-model="searchPrompt"
          placeholder="Search"
          aria-label="Search"
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
      <DarkModeToggle class="mode-toggle" />
    </template>
  </Menubar>
</template>

<script lang="ts" setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import InputGroup from 'primevue/inputgroup'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import EclipseIcon from '@/components/icons/EclipseIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref, watch } from 'vue'
import { reloadSearch } from '@/store/store'
import { onMounted } from 'vue'
import generateTooltip from '@/utils/generateTooltip'

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
.mode-toggle {
  margin-left: var(--p-menubar-gap);
  flex-shrink: 0;
}

:deep(a),
a {
  text-decoration: none;
}
</style>
