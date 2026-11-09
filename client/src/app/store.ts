import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import playerSlice from "@/features/player/playerSlice";
import themeSlice, { themeListener } from "@/features/theme/themeSlice";
import { api } from "@/services/api";

/**
 * Server state (movies, people…) lives in the RTK Query cache under `api`.
 * Client state that several distant components share lives in small slices:
 * the theme and the trailer player. Local UI state (open menus, the selected
 * season) stays in components with useState.
 */
const rootReducer = combineSlices(api, themeSlice, playerSlice);

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().prepend(themeListener.middleware).concat(api.middleware),
  });
  // Refetch stale data when the tab regains focus or the network returns.
  setupListeners(store.dispatch);
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
