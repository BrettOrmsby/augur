import { ref, toValue, type MaybeRef } from 'vue'
import {
  default as batchSearchScryfall,
  type BatchScryfallResult
} from '@/utils/batchScryfallSearch'
import { settings } from '@/store/store'

const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const data = ref<BatchScryfallResult | null>()

export function useScryfallData() {
  const fetchScryfallData = async (query: MaybeRef<{ q: string; page: number }>) => {
    isLoading.value = true
    isError.value = false
    errorMessage.value = ''
    data.value = null

    const { q, page } = toValue(query)
    try {
      const scryfallData = await batchSearchScryfall(q || 'id>=0', page, {
        order: settings.value.order,
        dir: settings.value.direction
      })
      if (!scryfallData.cards.length) {
        throw new Error('Pagination')
      }
      data.value = scryfallData
      isError.value = false
    } catch (e: any) {
      const details: string = e.details ?? ''

      if (details.startsWith('Your query didn')) {
        errorMessage.value = 'No cards match your query.'
      } else if (
        details.startsWith('You have paginated beyond the end of these results') ||
        e.message === 'Pagination'
      ) {
        errorMessage.value = 'This page does not exist for your query.'
      } else if (e.warnings?.length) {
        errorMessage.value = e.warnings.join('\n')
      }
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, isError, data, errorMessage, fetchScryfallData }
}
