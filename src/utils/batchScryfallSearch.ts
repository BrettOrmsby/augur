import scryfall from 'scryfall-client'
import type Card from 'scryfall-client/dist/models/card'
import type List from 'scryfall-client/dist/models/list'

const MAX_CACHE_ENTRIES = 3
scryfall.setUserAgent('Auger/1.0.0')

type SearchQueryOptions = {
  order?:
    | 'name'
    | 'set'
    | 'released'
    | 'rarity'
    | 'color'
    | 'usd'
    | 'tix'
    | 'eur'
    | 'cmc'
    | 'power'
    | 'toughness'
    | 'edhrec'
    | 'artist'
    | 'penny'
    | 'review'
  dir?: 'auto' | 'asc' | 'desc'
  // unique?: 'cards' | 'art' | 'prints'
  // include_extras?: boolean
  // include_multilingual?: boolean
  // include_variations?: boolean
}

export type BatchScryfallResult = { isMore: boolean; cards: Card[]; totalCards: number }

const apiCache = new Map<string, List<Card>>()

const generateCacheKey = (search: string, apiPage: number, options?: SearchQueryOptions) =>
  `${search}|${apiPage}|${options?.order}|${options?.dir}`

function getCached(key: string): List<Card> | undefined {
  const entry = apiCache.get(key)
  if (!entry) return undefined
  // Refresh order
  apiCache.delete(key)
  apiCache.set(key, entry)
  return entry
}

function setCached(key: string, result: List<Card>): void {
  apiCache.set(key, result)
  if (apiCache.size > MAX_CACHE_ENTRIES) {
    // Remove the oldest entry
    const firstKey = apiCache.keys().next().value!
    apiCache.delete(firstKey)
  }
}

async function loadAPIPage(
  searchString: string,
  apiPage: number,
  options?: SearchQueryOptions
): Promise<List<Card>> {
  const cacheKey = generateCacheKey(searchString, apiPage, options)
  if (apiCache.has(cacheKey)) return getCached(cacheKey)!
  const apiResult = await scryfall.search(searchString, { ...options, page: apiPage } as any)
  setCached(cacheKey, apiResult)
  return apiResult
}

export default async function batchSearchScryfall(
  searchString: string,
  pageNumber: number,
  options?: SearchQueryOptions
): Promise<BatchScryfallResult> {
  const API_CARD_SIZE = 175
  const PAGE_CARD_SIZE = 60
  const startCardNumber = (pageNumber - 1) * PAGE_CARD_SIZE // Zero-index start
  const endPageNumber = pageNumber * PAGE_CARD_SIZE - 1 // Zero-index start
  const apiPage = Math.floor(startCardNumber / API_CARD_SIZE) + 1

  const isNextAPIPageRequired = apiPage * API_CARD_SIZE <= endPageNumber

  const startPage = await loadAPIPage(searchString, apiPage, options)
  let nextPage
  if (isNextAPIPageRequired && startPage.has_more) {
    nextPage = await loadAPIPage(searchString, apiPage + 1, options)
    // Start loading next page to make it quicker
    if (nextPage.has_more) loadAPIPage(searchString, apiPage + 2, options)
  }

  // Start loading next page to make it quicker
  if (!nextPage && apiPage === 1 && startPage.has_more)
    loadAPIPage(searchString, apiPage + 1, options)

  const startIndex = startCardNumber - (apiPage - 1) * API_CARD_SIZE
  const batch: Card[] = startPage.slice(startIndex, startIndex + PAGE_CARD_SIZE)

  const endIndex = PAGE_CARD_SIZE - batch.length
  if (batch.length < PAGE_CARD_SIZE && nextPage) {
    batch.push(...nextPage.slice(0, endIndex))
  }

  const isNoNextAndMore =
    !nextPage && (startPage.has_more || startPage.length > startIndex + PAGE_CARD_SIZE)
  const isNextAndMore = !!nextPage && (nextPage.has_more || nextPage.length >= endIndex)
  return {
    isMore: isNoNextAndMore || isNextAndMore,
    totalCards: startPage.total_cards || 0,
    cards: batch
  }
}
