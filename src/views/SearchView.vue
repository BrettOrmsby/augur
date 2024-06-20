<template>
  <SettingsModel />
  <ClipboardModel />
  <main>
    <SearchToolBar :data="data" />
    <template v-if="isLoading">
      <Skeleton style="margin-top: 1rem; margin-bottom: 1rem" />
      <Divider />
      <div class="card-container">
        <SkeletonCard v-for="index in 6" :key="index"></SkeletonCard>
      </div>
    </template>
    <pre v-else-if="isError">{{ errorMessage }}</pre>
    <template v-else-if="data">
      <p>
        Viewing
        <b
          >{{ ((query.page - 1) * 175 + 1).toLocaleString() }}-{{
            (data?.total_cards && query.page * 175 > data.total_cards
              ? data.total_cards
              : query.page * 175
            ).toLocaleString()
          }}</b
        >
        of <b>{{ data?.total_cards?.toLocaleString() }}</b> cards
      </p>
      <Divider />
      <div class="card-container">
        <MTGCard v-for="(card, index) in data" :card="card" :key="index" />
      </div>
      <SearchToolBar :data="data" />
    </template>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import scryfall from 'scryfall-client'
import type List from 'scryfall-client/dist/models/list'
import type Card from 'scryfall-client/dist/models/card'
import Divider from 'primevue/divider'
import MTGCard from '@/components/MTGCard.vue'
import Skeleton from 'primevue/skeleton'
import SearchToolBar from '@/components/SearchToolBar.vue'
import SettingsModel from '@/components/SettingsModel.vue'
import ClipboardModel from '@/components/ClipboardModel.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { reloadSearch, settings } from '@/store/store'

const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')
const data = ref<null | List<Card>>(null)

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
watch(query, () => getScryfallData())
// If the search term does not change, it should be reloaded anyways
watch(reloadSearch, () => getScryfallData())

async function getScryfallData() {
  isLoading.value = true

  try {
    const scryfallData = await scryfall.search(query.value.q || 'id>=0', {
      page: Number(query.value.page),
      order: settings.value.order as any,
      dir: settings.value.direction
    })
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
pre {
  font-family: inherit;
  text-wrap: wrap;
}

.card-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--block-space);
}
</style>
