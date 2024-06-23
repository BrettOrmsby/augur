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
    </template>
  </main>
  <TheFooter />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import Skeleton from 'primevue/skeleton'
import MTGCard from '@/components/MTGCard.vue'
import SearchToolBar from '@/components/SearchToolBar.vue'
import SettingsModel from '@/components/SettingsModel.vue'
import ClipboardModel from '@/components/ClipboardModel.vue'
import NavBar from '@/components/NavBar.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { reloadSearch, settings } from '@/store/store'
import TheFooter from '@/components/TheFooter.vue'
import {
  default as batchSearchScryfall,
  type BatchScryfallResult
} from '@/utils/batchScryfallSearch'

const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')
const data = ref<null | BatchScryfallResult>(null)

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
  getScryfallData()
  document.title = query.value.q + ' • Augur Search'
})
// If the search term does not change, it should be reloaded anyways
watch(reloadSearch, () => {
  getScryfallData()
  document.title = (query.value.q || 'Everything') + ' • Augur Search'
})

async function getScryfallData() {
  isLoading.value = true

  try {
    const scryfallData = await batchSearchScryfall(
      query.value.q || 'id>=0',
      Number(query.value.page),
      {
        order: settings.value.order,
        dir: settings.value.direction
      }
    )
    data.value = scryfallData
    isError.value = false
  } catch (e) {
    const details: string = (e as any).originalError.response.body.details
    if (details.startsWith('Your query didn')) {
      errorMessage.value = 'No cards match your query.'
    } else if (details.startsWith('You have paginated beyond the end of these results')) {
      errorMessage.value = 'This page does not exist for your query.'
    } else if ((e as any).originalError.response.body.warnings?.length > 0) {
      errorMessage.value = (e as any).originalError.response.body.warnings.join('\n')
    }
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(getScryfallData)
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
