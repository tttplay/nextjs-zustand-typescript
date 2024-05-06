'use client'

import { createCounterStore, type CounterStoreType } from '@/stores/counter-store'
import { createContext, useRef, type PropsWithChildren } from 'react'

export const CounterStoreContext = createContext<CounterStoreType | null>(null)

export const CounterStoreProvider = ({ children, ...props }: PropsWithChildren<any>) => {
  const storeRef = useRef<CounterStoreType>()
  if (!storeRef.current) storeRef.current = createCounterStore(props)
  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}