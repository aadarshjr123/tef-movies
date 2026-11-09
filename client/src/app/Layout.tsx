import { Suspense } from "react";
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router";
import { TrailerModal } from "@/features/player/TrailerModal";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { paths } from "@/shared/lib/routes";
import { PageSpinner } from "@/shared/ui/feedback";
import { SearchIcon } from "@/shared/ui/icons";
import { gradientText } from "@/shared/ui/Section";

const NAV = [
  { to: paths.home, label: "Home", end: true },
  { to: paths.tvShows, label: "TV Shows" },
  { to: paths.movies, label: "Movies" },
  { to: paths.about, label: "About" },
];

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-night-border dark:bg-night/90">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <Link to={paths.home} className="font-mono text-2xl font-extrabold sm:text-3xl">
          <span className={gradientText}>TEF</span>
          <span className="sr-only"> </span>
          <span className="font-thin text-gray-500 dark:text-gray-400">MOVIES</span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:order-last">
          <Link
            to={paths.search()}
            aria-label="Search"
            className="rounded-full p-2 text-gray-700 transition hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-night-raised"
          >
            <SearchIcon />
          </Link>
          <ThemeToggle />
        </div>

        {/* Full width on phones (its own row); inline from sm up. */}
        <nav
          aria-label="Main"
          className="no-scrollbar -mx-4 w-[calc(100%+2rem)] overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:px-0"
        >
          <ul className="flex gap-5 whitespace-nowrap font-mono text-sm sm:text-base">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `${gradientText} underline-offset-8 hover:font-bold ${isActive ? "font-bold underline decoration-purple-500 decoration-2" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 py-8 text-center font-mono text-xs dark:border-night-border">
      <p className={`font-bold ${gradientText}`}>© 2022–2026 TEF Movies</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Data and images from{" "}
        <a href="https://www.themoviedb.org/" className="underline">
          TMDB
        </a>
        . Not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-screen-2xl flex-1 pt-4">
        <Suspense fallback={<PageSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <TrailerModal />
      <ScrollRestoration />
    </div>
  );
}
