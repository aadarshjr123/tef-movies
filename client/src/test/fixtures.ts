import type {
  MovieDetailsQuery,
  TitleCardFragment,
  TitleSpotlightFragment,
  TvShowDetailsQuery,
} from "@/graphql/__generated__/graphql";

let id = 0;
const nextId = () => `id-${++id}`;

export function cardFixture(overrides: Partial<TitleCardFragment> = {}): TitleCardFragment {
  return {
    __typename: "Movie",
    id: nextId(),
    kind: "MOVIE",
    name: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
    releaseDate: "2010-07-15",
    ratings: { imdb: 8.8 },
    watchOptions: [{ type: "SUBSCRIPTION", platform: { name: "Netflix" } }],
    ...overrides,
  } as TitleCardFragment;
}

export function spotlightFixture(overrides: Partial<TitleSpotlightFragment> = {}): TitleSpotlightFragment {
  return {
    __typename: "Movie",
    id: nextId(),
    kind: "MOVIE",
    name: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen.",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
    posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
    releaseDate: "2024-02-27",
    genres: ["Science Fiction"],
    ratings: { imdb: 8.5 },
    ...overrides,
  } as TitleSpotlightFragment;
}

type MovieDetails = NonNullable<MovieDetailsQuery["movie"]>;
type TvShowDetails = NonNullable<TvShowDetailsQuery["tvShow"]>;

export function movieDetailsFixture(overrides: Partial<MovieDetails> = {}): MovieDetails {
  return {
    __typename: "Movie",
    id: "movie-1",
    kind: "MOVIE",
    name: "Inception",
    originalName: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/backdrop.jpg",
    releaseDate: "2010-07-15",
    year: 2010,
    certification: "PG-13",
    genres: ["Action", "Science Fiction"],
    languages: ["English"],
    ratings: { imdb: 8.8, rottenTomatoes: 87 },
    cast: [{ name: "Leonardo DiCaprio", role: "Cobb", person: { imageUrl: "https://image.tmdb.org/p.jpg" } }],
    trailers: [{ name: "Official Trailer", youtubeId: "YoHD9XEInc0" }],
    watchOptions: [
      {
        type: "SUBSCRIPTION",
        url: "https://www.netflix.com/title/70131314",
        platform: { name: "Netflix", logoUrl: null, pricing: "Subscription" },
      },
    ],
    runtimeMinutes: 148,
    directors: [{ name: "Christopher Nolan", role: "Director", person: null }],
    similar: [cardFixture({ name: "Interstellar" })],
    ...overrides,
  } as MovieDetails;
}

export function tvShowDetailsFixture(overrides: Partial<TvShowDetails> = {}): TvShowDetails {
  return {
    __typename: "TvShow",
    id: "show-1",
    kind: "TV_SHOW",
    name: "Breaking Bad",
    originalName: "Breaking Bad",
    overview: "A chemistry teacher turns to crime.",
    posterUrl: null,
    backdropUrl: null,
    releaseDate: "2008-01-20",
    year: 2008,
    certification: null,
    genres: ["Drama"],
    languages: ["English"],
    ratings: { imdb: 9.5, rottenTomatoes: 96 },
    cast: [],
    trailers: [],
    watchOptions: [],
    status: "Ended",
    seasonCount: 2,
    creators: [{ name: "Vince Gilligan", role: "Creator", person: null }],
    seasons: [
      {
        number: 1,
        startDate: "2008-01-20",
        endDate: "2008-03-09",
        episodes: [{ number: 1, name: "Pilot", overview: "It begins.", runtimeMinutes: 59 }],
      },
      {
        number: 2,
        startDate: "2009-03-08",
        endDate: "2009-05-31",
        episodes: [{ number: 1, name: "Seven Thirty-Seven", overview: null, runtimeMinutes: 47 }],
      },
    ],
    similar: [],
    ...overrides,
  } as TvShowDetails;
}
