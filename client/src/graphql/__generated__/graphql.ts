/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type CollectionKind =
  | 'COLLECTION'
  | 'GENRE';

export type TitleFilter = {
  collection?: string | null | undefined;
  genre?: string | null | undefined;
  /** Matches cast members, directors and creators. */
  person?: string | null | undefined;
  platform?: string | null | undefined;
  watchType?: WatchType | null | undefined;
};

export type TitleKind =
  | 'MOVIE'
  | 'TV_SHOW';

export type TitleSort =
  | 'IMDB_RATING_DESC'
  | 'NAME_ASC'
  | 'RELEASE_DATE_DESC';

export type WatchType =
  | 'BUY'
  | 'FREE'
  | 'RENT'
  | 'SUBSCRIPTION';

export type CollectionsQueryVariables = Exact<{
  kind?: CollectionKind | null | undefined;
}>;


export type CollectionsQuery = { collections: Array<{ name: string, kind: CollectionKind, imageUrl: string | null }> };

export type PeopleQueryVariables = Exact<{
  limit?: number | null | undefined;
}>;


export type PeopleQuery = { people: Array<{ name: string, imageUrl: string | null }> };

export type PersonQueryVariables = Exact<{
  name: string;
}>;


export type PersonQuery = { person: { name: string, imageUrl: string | null, bio: string | null, movies: Array<{ id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }>, tvShows: Array<{ id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }> } | null };

type TitleCard_Movie_Fragment = { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> };

type TitleCard_TvShow_Fragment = { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> };

export type TitleCardFragment =
  | TitleCard_Movie_Fragment
  | TitleCard_TvShow_Fragment
;

type TitleSpotlight_Movie_Fragment = { id: string, kind: TitleKind, name: string, overview: string, backdropUrl: string | null, posterUrl: string | null, releaseDate: string, genres: Array<string>, ratings: { imdb: number | null } };

type TitleSpotlight_TvShow_Fragment = { id: string, kind: TitleKind, name: string, overview: string, backdropUrl: string | null, posterUrl: string | null, releaseDate: string, genres: Array<string>, ratings: { imdb: number | null } };

export type TitleSpotlightFragment =
  | TitleSpotlight_Movie_Fragment
  | TitleSpotlight_TvShow_Fragment
;

export type CreditFieldsFragment = { name: string, role: string | null, person: { imageUrl: string | null } | null };

type TitleDetails_Movie_Fragment = { id: string, kind: TitleKind, name: string, originalName: string | null, overview: string, posterUrl: string | null, backdropUrl: string | null, releaseDate: string, year: number, certification: string | null, genres: Array<string>, languages: Array<string>, ratings: { imdb: number | null, rottenTomatoes: number | null }, cast: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, trailers: Array<{ name: string, youtubeId: string }>, watchOptions: Array<{ type: WatchType, url: string, platform: { name: string, logoUrl: string | null, pricing: string | null } }> };

type TitleDetails_TvShow_Fragment = { id: string, kind: TitleKind, name: string, originalName: string | null, overview: string, posterUrl: string | null, backdropUrl: string | null, releaseDate: string, year: number, certification: string | null, genres: Array<string>, languages: Array<string>, ratings: { imdb: number | null, rottenTomatoes: number | null }, cast: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, trailers: Array<{ name: string, youtubeId: string }>, watchOptions: Array<{ type: WatchType, url: string, platform: { name: string, logoUrl: string | null, pricing: string | null } }> };

export type TitleDetailsFragment =
  | TitleDetails_Movie_Fragment
  | TitleDetails_TvShow_Fragment
;

export type MoviesQueryVariables = Exact<{
  filter?: TitleFilter | null | undefined;
  sort?: TitleSort | null | undefined;
  limit?: number | null | undefined;
}>;


export type MoviesQuery = { movies: Array<{ id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }> };

export type TvShowsQueryVariables = Exact<{
  filter?: TitleFilter | null | undefined;
  sort?: TitleSort | null | undefined;
  limit?: number | null | undefined;
}>;


export type TvShowsQuery = { tvShows: Array<{ id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }> };

export type SpotlightMoviesQueryVariables = Exact<{
  sort?: TitleSort | null | undefined;
  limit?: number | null | undefined;
}>;


export type SpotlightMoviesQuery = { movies: Array<{ id: string, kind: TitleKind, name: string, overview: string, backdropUrl: string | null, posterUrl: string | null, releaseDate: string, genres: Array<string>, ratings: { imdb: number | null } }> };

export type SpotlightTvShowsQueryVariables = Exact<{
  sort?: TitleSort | null | undefined;
  limit?: number | null | undefined;
}>;


export type SpotlightTvShowsQuery = { tvShows: Array<{ id: string, kind: TitleKind, name: string, overview: string, backdropUrl: string | null, posterUrl: string | null, releaseDate: string, genres: Array<string>, ratings: { imdb: number | null } }> };

export type MovieDetailsQueryVariables = Exact<{
  id: string | number;
}>;


export type MovieDetailsQuery = { movie: { runtimeMinutes: number | null, id: string, kind: TitleKind, name: string, originalName: string | null, overview: string, posterUrl: string | null, backdropUrl: string | null, releaseDate: string, year: number, certification: string | null, genres: Array<string>, languages: Array<string>, directors: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, similar: Array<
      | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
      | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
    >, ratings: { imdb: number | null, rottenTomatoes: number | null }, cast: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, trailers: Array<{ name: string, youtubeId: string }>, watchOptions: Array<{ type: WatchType, url: string, platform: { name: string, logoUrl: string | null, pricing: string | null } }> } | null };

export type TvShowDetailsQueryVariables = Exact<{
  id: string | number;
}>;


export type TvShowDetailsQuery = { tvShow: { status: string | null, seasonCount: number, id: string, kind: TitleKind, name: string, originalName: string | null, overview: string, posterUrl: string | null, backdropUrl: string | null, releaseDate: string, year: number, certification: string | null, genres: Array<string>, languages: Array<string>, creators: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, seasons: Array<{ number: number, startDate: string | null, endDate: string | null, episodes: Array<{ number: number, name: string, overview: string | null, runtimeMinutes: number | null }> }>, similar: Array<
      | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
      | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
    >, ratings: { imdb: number | null, rottenTomatoes: number | null }, cast: Array<{ name: string, role: string | null, person: { imageUrl: string | null } | null }>, trailers: Array<{ name: string, youtubeId: string }>, watchOptions: Array<{ type: WatchType, url: string, platform: { name: string, logoUrl: string | null, pricing: string | null } }> } | null };

export type LatestTrailersQueryVariables = Exact<{
  limit?: number | null | undefined;
}>;


export type LatestTrailersQuery = { latestTrailers: Array<{ name: string, youtubeId: string, title:
      | { id: string, kind: TitleKind, name: string }
      | { id: string, kind: TitleKind, name: string }
     | null }> };

export type SearchTitlesQueryVariables = Exact<{
  query: string;
}>;


export type SearchTitlesQuery = { search: Array<
    | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
    | { id: string, kind: TitleKind, name: string, posterUrl: string | null, releaseDate: string, ratings: { imdb: number | null }, watchOptions: Array<{ type: WatchType, platform: { name: string } }> }
  > };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const TitleCardFragmentDoc = new TypedDocumentString(`
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
    `, {"fragmentName":"TitleCard"}) as unknown as TypedDocumentString<TitleCardFragment, unknown>;
export const TitleSpotlightFragmentDoc = new TypedDocumentString(`
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
    `, {"fragmentName":"TitleSpotlight"}) as unknown as TypedDocumentString<TitleSpotlightFragment, unknown>;
export const CreditFieldsFragmentDoc = new TypedDocumentString(`
    fragment CreditFields on Credit {
  name
  role
  person {
    imageUrl
  }
}
    `, {"fragmentName":"CreditFields"}) as unknown as TypedDocumentString<CreditFieldsFragment, unknown>;
export const TitleDetailsFragmentDoc = new TypedDocumentString(`
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
    fragment CreditFields on Credit {
  name
  role
  person {
    imageUrl
  }
}`, {"fragmentName":"TitleDetails"}) as unknown as TypedDocumentString<TitleDetailsFragment, unknown>;
export const CollectionsDocument = new TypedDocumentString(`
    query Collections($kind: CollectionKind) {
  collections(kind: $kind) {
    name
    kind
    imageUrl
  }
}
    `) as unknown as TypedDocumentString<CollectionsQuery, CollectionsQueryVariables>;
export const PeopleDocument = new TypedDocumentString(`
    query People($limit: Int) {
  people(limit: $limit) {
    name
    imageUrl
  }
}
    `) as unknown as TypedDocumentString<PeopleQuery, PeopleQueryVariables>;
export const PersonDocument = new TypedDocumentString(`
    query Person($name: String!) {
  person(name: $name) {
    name
    imageUrl
    bio
    movies {
      ...TitleCard
    }
    tvShows {
      ...TitleCard
    }
  }
}
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
}`) as unknown as TypedDocumentString<PersonQuery, PersonQueryVariables>;
export const MoviesDocument = new TypedDocumentString(`
    query Movies($filter: TitleFilter, $sort: TitleSort, $limit: Int) {
  movies(filter: $filter, sort: $sort, limit: $limit) {
    ...TitleCard
  }
}
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
}`) as unknown as TypedDocumentString<MoviesQuery, MoviesQueryVariables>;
export const TvShowsDocument = new TypedDocumentString(`
    query TvShows($filter: TitleFilter, $sort: TitleSort, $limit: Int) {
  tvShows(filter: $filter, sort: $sort, limit: $limit) {
    ...TitleCard
  }
}
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
}`) as unknown as TypedDocumentString<TvShowsQuery, TvShowsQueryVariables>;
export const SpotlightMoviesDocument = new TypedDocumentString(`
    query SpotlightMovies($sort: TitleSort, $limit: Int) {
  movies(sort: $sort, limit: $limit) {
    ...TitleSpotlight
  }
}
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
}`) as unknown as TypedDocumentString<SpotlightMoviesQuery, SpotlightMoviesQueryVariables>;
export const SpotlightTvShowsDocument = new TypedDocumentString(`
    query SpotlightTvShows($sort: TitleSort, $limit: Int) {
  tvShows(sort: $sort, limit: $limit) {
    ...TitleSpotlight
  }
}
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
}`) as unknown as TypedDocumentString<SpotlightTvShowsQuery, SpotlightTvShowsQueryVariables>;
export const MovieDetailsDocument = new TypedDocumentString(`
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
fragment CreditFields on Credit {
  name
  role
  person {
    imageUrl
  }
}
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
}`) as unknown as TypedDocumentString<MovieDetailsQuery, MovieDetailsQueryVariables>;
export const TvShowDetailsDocument = new TypedDocumentString(`
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
fragment CreditFields on Credit {
  name
  role
  person {
    imageUrl
  }
}
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
}`) as unknown as TypedDocumentString<TvShowDetailsQuery, TvShowDetailsQueryVariables>;
export const LatestTrailersDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<LatestTrailersQuery, LatestTrailersQueryVariables>;
export const SearchTitlesDocument = new TypedDocumentString(`
    query SearchTitles($query: String!) {
  search(query: $query, limit: 40) {
    ...TitleCard
  }
}
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
}`) as unknown as TypedDocumentString<SearchTitlesQuery, SearchTitlesQueryVariables>;