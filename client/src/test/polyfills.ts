// Runs before setup.ts (and before MSW is imported, which captures the
// global Request), see setupFiles in vite.config.ts.

// Node 25 exposes an experimental global localStorage that shadows the DOM
// one and throws without --localstorage-file; use an in-memory Storage.
if (typeof globalThis.localStorage?.clear !== "function") {
  const data = new Map<string, string>();
  const storage: Storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, String(value)),
    removeItem: (key) => void data.delete(key),
    clear: () => data.clear(),
    key: (index) => [...data.keys()][index] ?? null,
    get length() {
      return data.size;
    },
  };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });
}

// jsdom replaces AbortSignal with its own class, which Node's fetch and
// Request reject (undici brand-checks the signal). Tests never abort
// requests, so the signal is dropped.
const withoutSignal = (init?: RequestInit) => (init?.signal ? { ...init, signal: undefined } : init);
const NativeRequest = globalThis.Request;
globalThis.Request = class extends NativeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, withoutSignal(init));
  }
};
const nativeFetch = globalThis.fetch;
globalThis.fetch = (input, init) => nativeFetch(input, withoutSignal(init));

export {};
