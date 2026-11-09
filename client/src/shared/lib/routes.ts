import type { TitleKind } from "@/graphql/__generated__/graphql";

/** Every URL in the app is built here, so routes can change in one place. */
export const paths = {
  home: "/",
  movies: "/movies",
  browseMovies: "/movies/browse",
  movie: (id: string) => `/movies/${id}`,
  tvShows: "/tv",
  browseTvShows: "/tv/browse",
  tvShow: (id: string) => `/tv/${id}`,
  title: (kind: TitleKind, id: string) => (kind === "MOVIE" ? `/movies/${id}` : `/tv/${id}`),
  genre: (name: string) => `/genres/${encodeURIComponent(name)}`,
  collection: (name: string) => `/collections/${encodeURIComponent(name)}`,
  person: (name: string) => `/people/${encodeURIComponent(name)}`,
  search: (query?: string) => (query ? `/search?q=${encodeURIComponent(query)}` : "/search"),
  about: "/about",
};
