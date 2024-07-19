'use client';

import { createStore } from 'zustand/vanilla';

export type CounterState = {
  count: number
  light: boolean
}

export type CounterActions = {
  increment: () => void
  decrement: () => void
  toggle: () => void
  fetch: (pond: any) => Promise<void>
  reset: () => void
  incrementTwice: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  count: 0,
  light: false,
}

export const initCounterState = (): CounterState => ({
  count: 0,
  light: false,
});

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set, get) => ({
    ...initCounterState,
    ...initState,
    toggle: () => {
      set({
        light: !get().light,
      });
    },
    // async fetch something
    fetch: async (pond: any) => {
      const response = await fetch(pond);
      set({ count: await response.json() });
    },
    increment: () => {
      set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
      set((state) => ({ count: state.count - 1 }));
    },
    reset: () => {
      set({ count: initCounterState().count });
    },
    incrementTwice: () => {
      get().increment();
      get().increment();
    },
  }))
}
