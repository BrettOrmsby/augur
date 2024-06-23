import type Card from 'scryfall-client/dist/models/card'
import type List from 'scryfall-client/dist/models/list'
import scryfall from 'scryfall-client'

type SearchQueryOptions = {
  unique?: 'cards' | 'art' | 'prints'
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
  include_extras?: boolean
  include_multilingual?: boolean
  include_variations?: boolean
}

export type BatchScryfallResult = { isMore: boolean; cards: Card[]; totalCards: number }

let prev: {
  pageNumber: number
  cards: List<Card>
  searchString: string
  options: SearchQueryOptions | undefined
} | null = null

/*
 * The scryfall api returns 175 cards
 * The scryfall website only shows 60 cards per page, so this website does too.
 * This function batches the api results into 60 cards so that the URL parameters match scryfall.
 */
export default async function batchSearchScryfall(
  searchString: string,
  pageNumber: number,
  options?: SearchQueryOptions | undefined
): Promise<BatchScryfallResult> {
  let toSavePage = null
  let numberCards = 60 * pageNumber
  const scryfallPage = Math.floor(numberCards / 175) + 1

  let cards: Card[]

  // Check to see if the scryfall page was loaded and saved and get that page
  if (
    prev &&
    prev.pageNumber === scryfallPage &&
    prev.searchString === searchString &&
    prev.options?.toString() === options?.toString()
  ) {
    cards = prev.cards
    toSavePage = prev.cards
  } else {
    toSavePage = await scryfall.search(searchString, { ...options, page: scryfallPage } as any)
    cards = toSavePage
  }

  // See if the previous page is needed
  let slice = 60 * (pageNumber - 1) - (scryfallPage - 1) * 175
  if (slice < 0) {
    slice = 175 + slice

    if (
      prev &&
      prev.pageNumber === scryfallPage - 1 &&
      prev.searchString === searchString &&
      prev.options?.toString() === options?.toString()
    ) {
      cards = [...prev.cards, ...cards]
    } else {
      const prevPage = await scryfall.search(searchString, {
        ...options,
        page: scryfallPage - 1
      } as any)
      cards = [...prevPage, ...cards]
    }
  }

  const batch = cards.slice(slice, slice + 60)

  // save this query for if it can be reused when the user goes to the previous or next page
  prev = { pageNumber: scryfallPage, cards: toSavePage, searchString, options }

  return {
    isMore: toSavePage.has_more || cards.length >= slice + 60,
    totalCards: toSavePage.total_cards || 0,
    cards: batch
  }
}
