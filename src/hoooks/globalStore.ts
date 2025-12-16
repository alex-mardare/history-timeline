import { createStore } from 'zustand/vanilla'

import { Coordinates } from '@/interfaces/coordinates'
import { HistoricalEvent } from '@/interfaces/historicalEvent'

export type Actions = {
  addHistoricalEventToMap: (historicalEvent: HistoricalEvent) => void
  setMapCenter: (coordinates: Coordinates) => void
}
export type State = {
  historicalEventsMap: Map<number, HistoricalEvent>
  mapCenter: Coordinates
}
export type Store = State & Actions

export const defaultInitState: State = {
  historicalEventsMap: new Map(),
  mapCenter: { lat: 0, lng: 0 }
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
    setMapCenter: (coordinates: Coordinates) => set({ mapCenter: coordinates })
  }))
}
