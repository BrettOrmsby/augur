<template>
  <SettingsModel />
  <ClipboardModel />
  <header>
    <NavBar />
  </header>
  <main>
    <SearchToolBar :isMore="!!data?.isMore" />
    <template v-if="isLoading">
      <Skeleton style="margin-top: 1rem; margin-bottom: 1rem" />
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
      <p>
        Viewing
        <b
          >{{ ((query.page - 1) * 60 + 1).toLocaleString() }}-{{
            (data.totalCards && query.page * 60 > data.totalCards
              ? data.totalCards
              : query.page * 60
            ).toLocaleString()
          }}</b
        >
        of <b>{{ data.totalCards.toLocaleString() }}</b> cards
      </p>
      <Divider />
      <div class="card-container">
        <MTGCard v-for="(card, index) in data.cards" :card="card" :key="index" />
      </div>
      <SearchToolBar :isMore="data.isMore" />
      <ScrollTop />
    </template>
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import ScrollTop from 'primevue/scrolltop'
import MTGCard from '@/components/MTGCard.vue'
import SearchToolBar from '@/components/SearchToolBar.vue'
import SettingsModel from '@/components/SettingsModel.vue'
import ClipboardModel from '@/components/ClipboardModel.vue'
import NavBar from '@/components/NavBar.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { reloadSearch } from '@/store/store'
import { useScryfallData } from '@/composables/useScryfallData'
import TheFooter from '@/components/TheFooter.vue'

const { isLoading, isError, data, errorMessage, fetchScryfallData } = useScryfallData()

const route = useRoute()
const router = useRouter()

const query = computed({
  get() {
    return {
      q: route.query.q?.toString() ?? '',
      page: isNaN(Number(route.query.page)) ? 1 : Number(route.query.page)
    }
  },
  set(value) {
    router.replace({ query: value })
  }
})

watch(query, () => {
  fetchScryfallData(query)
  document.title = query.value.q + ' • Augur Search'
})
// If the search term does not change, it should be reloaded anyways
watch(reloadSearch, () => {
  fetchScryfallData(query)
  document.title = (query.value.q || 'Everything') + ' • Augur Search'
})

onMounted(() => fetchScryfallData(query))
</script>

<style scoped>
main {
  min-height: 70vh;
}
.p-message {
  margin-top: var(--block-space);
  white-space: pre-wrap;
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
