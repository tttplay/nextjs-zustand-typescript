'use client';

import { CounterStoreContext } from '@/providers/CounterStoreProvider';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { combine } from "zustand/middleware";
import { createStore } from 'zustand/vanilla';

export type CounterStoreType = ReturnType<typeof createCounterStore>;
type CounterStore = ReturnType<CounterStoreType["getState"]>;

const initCounterState = () => ({
  count: 0,
  light: false,
});

export const useCounterStore = <T>(selector: (store: CounterStore) => T) => {
  const counterStore = useContext(CounterStoreContext)
  if (!counterStore)
    throw new Error("useCounterStore must be use within CounterStoreProvider")
  return useStore(counterStore, selector)
}

export const createCounterStore = (defaultInitState = {}) => {
  return createStore(
    combine({ ...initCounterState(), ...defaultInitState }, (set, get) => ({
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
      // style 1
      increment: () => {
        set({
          count: get().count + 1,
        });
      },
      decrement: () => {
        set({
          count: get().count - 1,
        });
      },
      reset: () => {
        set({
          count: initCounterState().count,
        });
      },
      // style 2
      decrementCount: () => set((state) => ({ count: state.count - 1 })),
      incrementCount: () => set((state) => ({ count: state.count + 1 })),
      resetCount: () => set(() => ({ count: initCounterState().count })),
    }))
  )
};