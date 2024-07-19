'use client'
import { createCounterStore, type CounterState, type CounterStore } from '@/stores/counter-store-3'
import { createContext, useContext, useRef, type PropsWithChildren } from 'react'
import { useStore, type StoreApi } from 'zustand'

// Context Generation 
export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(null)

// Provider Component
type CounterStoreProviderProps = {
  initState: CounterState
}

export const CounterStoreProvider = ({ children, initState }: PropsWithChildren<CounterStoreProviderProps>) => {
  const storeRef = useRef<StoreApi<CounterStore>>()
  if (!storeRef.current) storeRef.current = createCounterStore(initState)
  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

// Custom Hook
export const useCounterStore = <T,>(selector: (store: CounterStore) => T) => {
  const counterStore = useContext(CounterStoreContext)
  if (!counterStore)
    throw new Error("useCounterStore must be used within CounterStoreProvider")
  return useStore(counterStore, selector)
}