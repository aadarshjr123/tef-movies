import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { makeStore } from "@/app/store";
import { renderWithProviders } from "@/test/render";
import { ThemeToggle } from "./ThemeToggle";
import themeSlice, { THEME_STORAGE_KEY, themeSet, themeToggled } from "./themeSlice";

describe("themeSlice", () => {
  it("toggles between light and dark", () => {
    const reducer = themeSlice.reducer;
    expect(reducer({ mode: "dark" }, themeToggled())).toEqual({ mode: "light" });
    expect(reducer({ mode: "light" }, themeToggled())).toEqual({ mode: "dark" });
  });

  it("starts from the theme index.html applied", () => {
    document.documentElement.classList.add("dark");
    expect(makeStore().getState().theme.mode).toBe("dark");
  });

  it("applies and persists changes through the listener middleware", () => {
    const store = makeStore();

    store.dispatch(themeSet("dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    store.dispatch(themeToggled());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });
});

describe("ThemeToggle", () => {
  it("reflects and toggles the theme", async () => {
    const { user, store } = renderWithProviders(<ThemeToggle />);
    const button = screen.getByRole("button", { name: "Dark mode" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);

    expect(store.getState().theme.mode).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
