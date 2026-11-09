export type TitleKind = "MOVIE" | "TV_SHOW";
export type WatchType = "SUBSCRIPTION" | "FREE" | "RENT" | "BUY";
export type TitleSort = "RELEASE_DATE_DESC" | "IMDB_RATING_DESC" | "NAME_ASC";

export interface CastMember {
  name: string;
  character: string | null;
}

export interface Trailer {
  name: string;
  youtubeId: string;
}

export interface WatchOption {
  platform: string;
  type: WatchType;
  url: string;
}

export interface Ratings {
  imdb: number | null;
  rottenTomatoes: number | null;
}

interface TitleBase {
  id: string;
  name: string;
  originalName: string | null;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  /** ISO 8601 date, e.g. "2010-07-15". */
  releaseDate: string;
  certification: string | null;
  genres: string[];
  /** Curated collections such as "Christopher Nolan" or "Free Classics". */
  collections: string[];
  languages: string[];
  ratings: Ratings;
  cast: CastMember[];
  trailers: Trailer[];
  watchOptions: WatchOption[];
}

export interface Movie extends TitleBase {
  kind: "MOVIE";
  runtimeMinutes: number | null;
  directors: string[];
}

export interface TvShow extends TitleBase {
  kind: "TV_SHOW";
  creators: string[];
  status: string | null;
  seasonCount: number;
}

export type Title = Movie | TvShow;

/** Fields shared by create and update inputs. */
export type TitleInput<T extends Title> = Omit<T, "id" | "kind">;

export interface Episode {
  number: number;
  name: string;
  overview: string | null;
  runtimeMinutes: number | null;
}

export interface Season {
  titleId: string;
  number: number;
  startDate: string | null;
  endDate: string | null;
  episodes: Episode[];
}

export type SeasonInput = Omit<Season, "titleId">;

export interface TitleFilter {
  genre?: string | null;
  collection?: string | null;
  person?: string | null;
  platform?: string | null;
  watchType?: WatchType | null;
}

export interface TitleQuery {
  kind?: TitleKind;
  filter?: TitleFilter;
  sort: TitleSort;
  limit: number;
}

/** A trailer, optionally with the title it belongs to. */
export type TrailerParent = Trailer & { title?: Title };

/** A cast member, director or creator credit. */
export interface CreditParent {
  name: string;
  role: string | null;
}
