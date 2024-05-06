import { createStore } from 'zustand'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
}

export type CounterStore = CounterState & CounterActions

export const initCounterState = (): CounterState => {
  return { count: 0 }
}

export const defaultInitState: CounterState = {
  count: 0,
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initCounterState,
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }))
}