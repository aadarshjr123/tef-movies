import type { TitleKind } from "@/graphql/__generated__/graphql";
import { paths } from "@/shared/lib/routes";

/** Per-kind wording and links, so pages are written once for movies and TV shows. */
export const KIND = {
  MOVIE: { plural: "Movies", lower: "movies", home: paths.movies, browse: paths.browseMovies },
  TV_SHOW: { plural: "TV Shows", lower: "TV shows", home: paths.tvShows, browse: paths.browseTvShows },
} satisfies Record<TitleKind, { plural: string; lower: string; home: string; browse: string }>;

/** Streaming services that get their own row on the Movies and TV Shows pages. */
export const FEATURED_PLATFORMS = ["Netflix", "Amazon Prime Video", "JioHotstar"] as const;
