import type { RouteObject } from "react-router";
import type { CollectionKind, TitleKind } from "@/graphql/__generated__/graphql";
import { Layout } from "./Layout";
import { NotFoundPage, RouteErrorPage } from "./NotFoundPage";

// Every page is its own chunk, so the first visit downloads only the page it
// needs. A page that takes a kind is wrapped once here.
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const kindPage =
  (load: () => Promise<{ default: React.ComponentType<{ kind: TitleKind }> }>, kind: TitleKind) => async () => {
    const { default: Page } = await load();
    return { Component: () => <Page kind={kind} /> };
  };

const collectionPage = (kind: CollectionKind) => async () => {
  const { default: Page } = await import("@/features/catalog/CollectionPage");
  return { Component: () => <Page kind={kind} /> };
};

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, lazy: page(() => import("@/features/titles/pages/HomePage")) },
      { path: "movies", lazy: kindPage(() => import("@/features/titles/pages/KindLandingPage"), "MOVIE") },
      { path: "movies/browse", lazy: kindPage(() => import("@/features/titles/pages/BrowsePage"), "MOVIE") },
      { path: "movies/:id", lazy: page(() => import("@/features/titles/pages/MovieDetailsPage")) },
      { path: "tv", lazy: kindPage(() => import("@/features/titles/pages/KindLandingPage"), "TV_SHOW") },
      { path: "tv/browse", lazy: kindPage(() => import("@/features/titles/pages/BrowsePage"), "TV_SHOW") },
      { path: "tv/:id", lazy: page(() => import("@/features/titles/pages/TvShowDetailsPage")) },
      { path: "genres/:name", lazy: collectionPage("GENRE") },
      { path: "collections/:name", lazy: collectionPage("COLLECTION") },
      { path: "people/:name", lazy: page(() => import("@/features/people/PersonPage")) },
      { path: "search", lazy: page(() => import("@/features/search/SearchPage")) },
      { path: "about", lazy: page(() => import("@/features/about/AboutPage")) },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
