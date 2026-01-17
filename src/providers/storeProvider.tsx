'use client'

import { type ReactNode, createContext, useState, useContext } from 'react'
import { useStore } from 'zustand'

import { type Store, createStateStore } from '@/hooks/globalStore'

export type StoreApi = ReturnType<typeof createStateStore>
export interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<StoreApi | undefined>(undefined)
export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createStateStore())
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStateStore = <T,>(selector: (store: Store) => T): T => {
  const storeContext = useContext(StoreContext)
  if (!storeContext) {
    throw new Error(`useStateStore must be used within StoreProvider`)
  }

  return useStore(storeContext, selector)
}
