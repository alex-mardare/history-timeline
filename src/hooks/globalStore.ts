import { createStore } from 'zustand/vanilla'

import { HistoricalEvent, MapCenter, SearchType } from '@/types'
import { LocationBoundary } from '@/types/location'

export type Actions = {
  addHistoricalEventToMap: (historicalEvent: HistoricalEvent) => void
  setEventsCalculatedCenter: (center: MapCenter) => void
  setLocationBoundary: (locationBoundary: LocationBoundary | null) => void
  setMapCenter: (mapCenter: MapCenter) => void
  setSearchType: (searchType: SearchType) => void
}
export type State = {
  eventsCalculatedCenter: MapCenter
  historicalEventsMap: Map<number, HistoricalEvent>
  locationBoundary: LocationBoundary | null
  mapCenter: MapCenter
  searchType: SearchType
}
export type Store = State & Actions

export const defaultInitState: State = {
  eventsCalculatedCenter: { lat: 0, lng: 0, zoom: 0 },
  historicalEventsMap: new Map(),
  locationBoundary: null,
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
    setLocationBoundary: (locationBoundary: LocationBoundary | null) =>
      set({ locationBoundary: locationBoundary }),
    setMapCenter: (mapCenter: MapCenter) => set({ mapCenter: mapCenter }),
    setSearchType: (searchType: SearchType) => set({ searchType: searchType })
  }))
}
