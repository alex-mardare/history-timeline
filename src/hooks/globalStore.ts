import { createStore } from 'zustand/vanilla'

import {
  HistoricalEvent,
  LocationBoundary,
  MapCenter,
  SearchType
} from '@/types'

export type Actions = {
  addCountryHistoricalEvents: (historicalEvents: HistoricalEvent) => void
  addMapHistoricalEvents: (historicalEvent: HistoricalEvent) => void
  resetCountryHistoricalEvents: () => void
  setActiveEventId: (eventId: number) => void
  setEventsCalculatedCenter: (center: MapCenter) => void
  setLocationBoundary: (locationBoundary: LocationBoundary | null) => void
  setMapCenter: (mapCenter: MapCenter) => void
  setSearchType: (searchType: SearchType) => void
}
export type State = {
  activeEventId: number
  countryHistoricalEvents: Map<number, HistoricalEvent>
  eventsCalculatedCenter: MapCenter
  mapHistoricalEvents: Map<number, HistoricalEvent>
  locationBoundary: LocationBoundary | null
  mapCenter: MapCenter
  searchType: SearchType
}
export type Store = State & Actions

export const defaultInitState: State = {
  activeEventId: 0,
  countryHistoricalEvents: new Map(),
  eventsCalculatedCenter: { lat: 0, long: 0, zoom: 0 },
  mapHistoricalEvents: new Map(),
  locationBoundary: null,
  mapCenter: { lat: 0, long: 0, zoom: 0 },
  searchType: 'event'
}

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<Store>()((set) => ({
    ...initState,
    addCountryHistoricalEvents: (historicalEvent: HistoricalEvent) =>
      set((state) => ({
        countryHistoricalEvents: state.countryHistoricalEvents.set(
          historicalEvent.id,
          historicalEvent
        )
      })),
    addMapHistoricalEvents: (historicalEvent: HistoricalEvent) =>
      set((state) => ({
        mapHistoricalEvents: state.mapHistoricalEvents.set(
          historicalEvent.id,
          historicalEvent
        )
      })),
    resetCountryHistoricalEvents: () =>
      set({ countryHistoricalEvents: new Map() }),
    setActiveEventId: (eventId: number) => set({ activeEventId: eventId }),
    setEventsCalculatedCenter: (center: MapCenter) =>
      set({ eventsCalculatedCenter: center }),
    setLocationBoundary: (locationBoundary: LocationBoundary | null) =>
      set({ locationBoundary: locationBoundary }),
    setMapCenter: (mapCenter: MapCenter) => set({ mapCenter: mapCenter }),
    setSearchType: (searchType: SearchType) => set({ searchType: searchType })
  }))
}
