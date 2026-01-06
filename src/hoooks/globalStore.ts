import { createStore } from 'zustand/vanilla'

import { HistoricalEvent } from '@/interfaces/historicalEvent'
import { MapCenter } from '@/interfaces/mapInterfaces'

export type Actions = {
  addHistoricalEventToMap: (historicalEvent: HistoricalEvent) => void
  setEventsCalculatedCenter: (center: MapCenter) => void
  setMapCenter: (mapCenter: MapCenter) => void
}
export type State = {
  eventsCalculatedCenter: MapCenter
  historicalEventsMap: Map<number, HistoricalEvent>
  mapCenter: MapCenter
}
export type Store = State & Actions

export const defaultInitState: State = {
  eventsCalculatedCenter: { lat: 0, lng: 0, zoom: 0 },
  historicalEventsMap: new Map(),
  mapCenter: { lat: 0, lng: 0, zoom: 0 }
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
    setMapCenter: (mapCenter: MapCenter) => set({ mapCenter: mapCenter })
  }))
}
