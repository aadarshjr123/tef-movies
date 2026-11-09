import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { MoonIcon, SunIcon } from "@/shared/ui/icons";
import { selectThemeMode, themeToggled } from "./themeSlice";

export function ThemeToggle() {
  const mode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(themeToggled())}
      aria-label="Dark mode"
      aria-pressed={isDark}
      className="rounded-full p-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-night-raised"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
