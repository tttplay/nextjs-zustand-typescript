'use client';

import { useCounterStore } from "@/stores/counter-store";

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((store) => store.increment);
  const decrement = useCounterStore((store) => store.decrement);
  const reset = useCounterStore((store) => store.reset);

  return (
    <div className="bg-gray-100 p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Count: <span className="text-purple-600">{count}</span>
      </h1>
      <div className="flex space-x-4">
        <button onClick={increment} className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700">
          +1
        </button>
        <button onClick={decrement} className="bg-red-600 text-white px-8 py-2 rounded hover:bg-red-700">
          -1
        </button>
        <button onClick={reset} className="bg-purple-600 text-white px-8 py-2 rounded hover:bg-purple-700">
          Reset
        </button>
      </div>
    </div>
  );
};
