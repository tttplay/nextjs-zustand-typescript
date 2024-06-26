'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { useStore, type StoreApi } from 'zustand'

import {
  createCounterStore,
  type CounterState,
  type CounterStore,
} from '@/stores/counter-store-2'

export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(
  null,
)

export interface CounterStoreProviderProps {
  children: ReactNode
  initState: CounterState
}

export const CounterStoreProvider = ({
  children,
  initState,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initState)
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T,>(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}