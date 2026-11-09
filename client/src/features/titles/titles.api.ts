import { graphql } from "@/graphql/__generated__";
import type {
  LatestTrailersQuery,
  MovieDetailsQuery,
  MoviesQuery,
  MoviesQueryVariables,
  SearchTitlesQuery,
  SpotlightMoviesQuery,
  SpotlightTvShowsQuery,
  TitleCardFragment,
  TitleKind,
  TitleSort,
  TitleSpotlightFragment,
  TvShowDetailsQuery,
  TvShowsQuery,
} from "@/graphql/__generated__/graphql";
import { api } from "@/services/api";

graphql(`
  fragment TitleCard on Title {
    id
    kind
    name
    posterUrl
    releaseDate
    ratings {
      imdb
    }
    watchOptions {
      type
      platform {
        name
      }
    }
  }
`);

graphql(`
  fragment TitleSpotlight on Title {
    id
    kind
    name
    overview
    backdropUrl
    posterUrl
    releaseDate
    genres
    ratings {
      imdb
    }
  }
`);

graphql(`
  fragment CreditFields on Credit {
    name
    role
    person {
      imageUrl
    }
  }
`);

graphql(`
  fragment TitleDetails on Title {
    id
    kind
    name
    originalName
    overview
    posterUrl
    backdropUrl
    releaseDate
    year
    certification
    genres
    languages
    ratings {
      imdb
      rottenTomatoes
    }
    cast {
      ...CreditFields
    }
    trailers {
      name
      youtubeId
    }
    watchOptions {
      type
      url
      platform {
        name
        logoUrl
        pricing
      }
    }
  }
`);

const MoviesDocument = graphql(`
  query Movies($filter: TitleFilter, $sort: TitleSort, $limit: Int) {
    movies(filter: $filter, sort: $sort, limit: $limit) {
      ...TitleCard
    }
  }
`);

const TvShowsDocument = graphql(`
  query TvShows($filter: TitleFilter, $sort: TitleSort, $limit: Int) {
    tvShows(filter: $filter, sort: $sort, limit: $limit) {
      ...TitleCard
    }
  }
`);

const SpotlightMoviesDocument = graphql(`
  query SpotlightMovies($sort: TitleSort, $limit: Int) {
    movies(sort: $sort, limit: $limit) {
      ...TitleSpotlight
    }
  }
`);

const SpotlightTvShowsDocument = graphql(`
  query SpotlightTvShows($sort: TitleSort, $limit: Int) {
    tvShows(sort: $sort, limit: $limit) {
      ...TitleSpotlight
    }
  }
`);

const MovieDetailsDocument = graphql(`
  query MovieDetails($id: ID!) {
    movie(id: $id) {
      ...TitleDetails
      runtimeMinutes
      directors {
        ...CreditFields
      }
      similar(limit: 12) {
        ...TitleCard
      }
    }
  }
`);

const TvShowDetailsDocument = graphql(`
  query TvShowDetails($id: ID!) {
    tvShow(id: $id) {
      ...TitleDetails
      status
      seasonCount
      creators {
        ...CreditFields
      }
      seasons {
        number
        startDate
        endDate
        episodes {
          number
          name
          overview
          runtimeMinutes
        }
      }
      similar(limit: 12) {
        ...TitleCard
      }
    }
  }
`);

const LatestTrailersDocument = graphql(`
  query LatestTrailers($limit: Int) {
    latestTrailers(limit: $limit) {
      name
      youtubeId
      title {
        id
        kind
        name
      }
    }
  }
`);

const SearchTitlesDocument = graphql(`
  query SearchTitles($query: String!) {
    search(query: $query, limit: 40) {
      ...TitleCard
    }
  }
`);

export type TitlesArgs = MoviesQueryVariables & { kind: TitleKind };

export const titlesApi = api.injectEndpoints({
  endpoints: (build) => ({
    /** Movies or TV shows, filtered and sorted; one endpoint serves both kinds. */
    getTitles: build.query<TitleCardFragment[], TitlesArgs>({
      query: ({ kind, ...variables }) => ({ document: kind === "MOVIE" ? MoviesDocument : TvShowsDocument, variables }),
      transformResponse: (data: MoviesQuery | TvShowsQuery) => ("movies" in data ? data.movies : data.tvShows),
    }),
    /** Titles with backdrops and overviews, for hero carousels and sidebars. */
    getSpotlight: build.query<TitleSpotlightFragment[], { kind: TitleKind; limit: number; sort?: TitleSort }>({
      query: ({ kind, ...variables }) => ({
        document: kind === "MOVIE" ? SpotlightMoviesDocument : SpotlightTvShowsDocument,
        variables,
      }),
      transformResponse: (data: SpotlightMoviesQuery | SpotlightTvShowsQuery) =>
        "movies" in data ? data.movies : data.tvShows,
    }),
    getMovie: build.query<MovieDetailsQuery["movie"], string>({
      query: (id) => ({ document: MovieDetailsDocument, variables: { id } }),
      transformResponse: (data: MovieDetailsQuery) => data.movie,
    }),
    getTvShow: build.query<TvShowDetailsQuery["tvShow"], string>({
      query: (id) => ({ document: TvShowDetailsDocument, variables: { id } }),
      transformResponse: (data: TvShowDetailsQuery) => data.tvShow,
    }),
    getLatestTrailers: build.query<LatestTrailersQuery["latestTrailers"], number>({
      query: (limit) => ({ document: LatestTrailersDocument, variables: { limit } }),
      transformResponse: (data: LatestTrailersQuery) => data.latestTrailers,
    }),
    searchTitles: build.query<SearchTitlesQuery["search"], string>({
      query: (query) => ({ document: SearchTitlesDocument, variables: { query } }),
      transformResponse: (data: SearchTitlesQuery) => data.search,
    }),
  }),
});

export const {
  useGetTitlesQuery,
  useGetSpotlightQuery,
  useGetMovieQuery,
  useGetTvShowQuery,
  useGetLatestTrailersQuery,
  useSearchTitlesQuery,
  usePrefetch: useTitlesPrefetch,
} = titlesApi;
