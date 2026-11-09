import { createListenerMiddleware, createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "tef-theme";

interface ThemeState {
  mode: ThemeMode;
}

/** index.html applies the theme before React loads; start from what it chose. */
export function readInitialTheme(): ThemeMode {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const themeSlice = createSlice({
  name: "theme",
  initialState: (): ThemeState => ({ mode: readInitialTheme() }),
  reducers: {
    themeToggled(state) {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    themeSet(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
  selectors: {
    selectThemeMode: (state) => state.mode,
  },
});

export const { themeToggled, themeSet } = themeSlice.actions;
export const { selectThemeMode } = themeSlice.selectors;
export default themeSlice;

/**
 * Side effects of a theme change (DOM class, localStorage) live in listener
 * middleware rather than in components or reducers, which stay pure.
 */
export const themeListener = createListenerMiddleware();

themeListener.startListening({
  predicate: (action) => themeToggled.match(action) || themeSet.match(action),
  effect: (_action, listenerApi) => {
    const { mode } = (listenerApi.getState() as { theme: ThemeState }).theme;
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  },
});
