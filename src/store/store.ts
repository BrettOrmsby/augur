import { useLocalStorage } from '@vueuse/core'
import { reactive, ref } from 'vue'

export const UIStates = reactive({
  isSettingsOpen: false,
  isClipBoardOpen: false
})

export const clipboard = useLocalStorage<{ cards: string[] }>('clipboard', { cards: [] })

export const settings = useLocalStorage<{
  order:
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
    | 'penny'
    | 'artist'
    | 'review'
  direction: 'auto' | 'asc' | 'desc'
  price: 'usd' | 'usd_foil' | 'usd_etched' | 'eur' | 'eur_foil' | 'tix'
}>('settings', {
  order: 'edhrec',
  direction: 'auto',
  price: 'usd'
})

export const reloadSearch = ref(0)
