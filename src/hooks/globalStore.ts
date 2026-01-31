import { createStore } from 'zustand/vanilla'

import { SearchType } from '@/types/enums'
import { HistoricalEvent } from '@/types/historicalEvent'
import { MapCenter } from '@/types/mapInterfaces'

export type Actions = {
  addHistoricalEventToMap: (historicalEvent: HistoricalEvent) => void
  setEventsCalculatedCenter: (center: MapCenter) => void
  setMapCenter: (mapCenter: MapCenter) => void
  setSearchType: (searchType: SearchType) => void
}
export type State = {
  eventsCalculatedCenter: MapCenter
  historicalEventsMap: Map<number, HistoricalEvent>
  mapCenter: MapCenter
  searchType: SearchType
}
export type Store = State & Actions

export const defaultInitState: State = {
  eventsCalculatedCenter: { lat: 0, lng: 0, zoom: 0 },
  historicalEventsMap: new Map(),
  mapCenter: { lat: 0, lng: 0, zoom: 0 },
  searchType: 'event'
}

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<Store>()((set) => ({
    ...initState,
    addHistoricalEventToMap: (historicalEvent: HistoricalEvent) =>
      set((state) => ({
        historicalEventsMap: state.historicalEventsMap.set(
          historicalEvent.id,
          historicalEvent
        )
      })),
    setEventsCalculatedCenter: (center: MapCenter) =>
      set({ eventsCalculatedCenter: center }),
    setMapCenter: (mapCenter: MapCenter) => set({ mapCenter: mapCenter }),
    setSearchType: (searchType: SearchType) => set({ searchType: searchType })
  }))
}
