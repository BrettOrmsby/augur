<template>
  <SettingsModel />
  <ClipboardModel />
  <header>
    <NavBar />
  </header>
  <main>
    <template v-if="isLoading">
      <Skeleton style="margin-top: 1rem; margin-bottom: 1rem; height: 2rem" />
      <Divider />
      <div class="card-container">
        <SkeletonCard v-for="index in 12" :key="index" />
      </div>
    </template>
    <Message
      v-else-if="isError"
      :severity="errorMessage === 'No cards match your query.' ? 'warn' : 'error'"
    >
      {{ errorMessage }}
    </Message>
    <template v-else-if="data">
      <div class="viewing-bar">
        <span>
          Viewing
          <b>{{ viewingText.start }}-{{ viewingText.end }}</b>
          of <b>{{ viewingText.total }}</b> cards</span
        >
        <AddPageButton />
      </div>
      <Divider />
      <div class="card-container">
        <MTGCard v-for="(card, index) in data.cards" :card="card" :key="index" />
      </div>
      <SearchToolBar :isMore="data.isMore" />
    </template>
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Divider, Message, Skeleton } from 'primevue'
import AddPageButton from '@/components/AddPageButton.vue'
import ClipboardModel from '@/components/ClipboardModel.vue'
import MTGCard from '@/components/MTGCard.vue'
import NavBar from '@/components/NavBar.vue'
import SearchToolBar from '@/components/SearchToolBar.vue'
import SettingsModel from '@/components/SettingsModel.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useScryfallData } from '@/composables/useScryfallData'
import { reloadSearch } from '@/store/store'

const { isLoading, isError, data, errorMessage, fetchScryfallData } = useScryfallData()

const route = useRoute()
const router = useRouter()

const query = computed(() => ({
  q: route.query.q?.toString() ?? '',
  page: isNaN(Number(route.query.page)) ? 1 : Number(route.query.page)
}))

const viewingText = computed(() => {
  if (!data.value) return { start: 0, end: 0, total: 0 }
  const start = ((query.value.page - 1) * 60 + 1).toLocaleString()
  const end = Math.min(data.value.totalCards, query.value.page * 60).toLocaleString()
  const total = data.value.totalCards.toLocaleString()
  return { start, end, total }
})

watch(
  [query, reloadSearch],
  () => {
    fetchScryfallData(query)
    document.title = query.value.q + ' • Augur Search'
  },
  { immediate: true }
)
</script>

<style scoped>
main {
  min-height: 70vh;
}
.p-message {
  margin-top: var(--block-space);
  white-space: pre-wrap;
}

.viewing-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--block-space) 0;
  gap: var(--inline-space);
}

.card-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--block-space);
  margin-top: var(--block-space);
}

@media (min-width: 370px) {
  .card-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--block-space);
  }
}

@media (min-width: 600px) {
  .card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--block-space);
  }
}

@media (min-width: 800px) {
  .card-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
