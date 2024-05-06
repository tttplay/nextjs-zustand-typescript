'use server';

import Counter from '@/components/counter';
import { CounterStoreProvider } from '@/providers/CounterStoreProvider';

async function fetchSomething() {
  // some server action or api get
  return { count: 99 }
}

export default async function Home() {
  const something = await fetchSomething();
  return (
    <CounterStoreProvider count={something.count}>
      <main className="flex min-h-screen items-center justify-center">
        <Counter />
      </main>
    </CounterStoreProvider>
  );
}
