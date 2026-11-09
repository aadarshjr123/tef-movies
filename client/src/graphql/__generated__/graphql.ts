/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CastMemberInput = {
  character?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** A browse tile. GENRE tiles match Title.genres; COLLECTION tiles match Title.collections. */
export type Collection = {
  __typename?: 'Collection';
  imageUrl?: Maybe<Scalars['String']['output']>;
  kind: CollectionKind;
  name: Scalars['String']['output'];
};

export type CollectionInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  kind: CollectionKind;
  name: Scalars['String']['input'];
};

export type CollectionKind =
  | 'COLLECTION'
  | 'GENRE';

/** A person's credit on a title: a cast role, or a director or creator. */
export type Credit = {
  __typename?: 'Credit';
  name: Scalars['String']['output'];
  person?: Maybe<Person>;
  /** Character name for cast members; 'Director' or 'Creator' for crew. */
  role?: Maybe<Scalars['String']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  overview?: Maybe<Scalars['String']['output']>;
  runtimeMinutes?: Maybe<Scalars['Int']['output']>;
};

export type EpisodeInput = {
  name: Scalars['String']['input'];
  number: Scalars['Int']['input'];
  overview?: InputMaybe<Scalars['String']['input']>;
  runtimeMinutes?: InputMaybe<Scalars['Int']['input']>;
};

export type Movie = Title & {
  __typename?: 'Movie';
  backdropUrl?: Maybe<Scalars['String']['output']>;
  cast: Array<Credit>;
  certification?: Maybe<Scalars['String']['output']>;
  collections: Array<Scalars['String']['output']>;
  directors: Array<Credit>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kind: TitleKind;
  languages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  originalName?: Maybe<Scalars['String']['output']>;
  overview: Scalars['String']['output'];
  posterUrl?: Maybe<Scalars['String']['output']>;
  ratings: Ratings;
  releaseDate: Scalars['String']['output'];
  runtimeMinutes?: Maybe<Scalars['Int']['output']>;
  similar: Array<Title>;
  trailers: Array<Trailer>;
  watchOptions: Array<WatchOption>;
  year: Scalars['Int']['output'];
};


export type MovieSimilarArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type MovieInput = {
  backdropUrl?: InputMaybe<Scalars['String']['input']>;
  cast?: InputMaybe<Array<CastMemberInput>>;
  certification?: InputMaybe<Scalars['String']['input']>;
  collections?: InputMaybe<Array<Scalars['String']['input']>>;
  directors?: InputMaybe<Array<Scalars['String']['input']>>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  originalName?: InputMaybe<Scalars['String']['input']>;
  overview: Scalars['String']['input'];
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  ratings?: InputMaybe<RatingsInput>;
  releaseDate: Scalars['String']['input'];
  runtimeMinutes?: InputMaybe<Scalars['Int']['input']>;
  trailers?: InputMaybe<Array<TrailerInput>>;
  watchOptions?: InputMaybe<Array<WatchOptionInput>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  createTvShow: TvShow;
  deleteCollection: Scalars['Boolean']['output'];
  deleteMovie: Scalars['ID']['output'];
  deletePerson: Scalars['Boolean']['output'];
  deletePlatform: Scalars['Boolean']['output'];
  deleteSeason: Scalars['Boolean']['output'];
  /** Also deletes the show's seasons. */
  deleteTvShow: Scalars['ID']['output'];
  /** Creates or replaces the season with this number. */
  setSeason: Season;
  /** Replaces every field of the movie. */
  updateMovie: Movie;
  updateTvShow: TvShow;
  upsertCollection: Collection;
  /** Creates the person, or replaces the one with the same name. */
  upsertPerson: Person;
  upsertPlatform: Platform;
};


export type MutationCreateMovieArgs = {
  input: MovieInput;
};


export type MutationCreateTvShowArgs = {
  input: TvShowInput;
};


export type MutationDeleteCollectionArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePersonArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeletePlatformArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteSeasonArgs = {
  number: Scalars['Int']['input'];
  tvShowId: Scalars['ID']['input'];
};


export type MutationDeleteTvShowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetSeasonArgs = {
  input: SeasonInput;
  tvShowId: Scalars['ID']['input'];
};


export type MutationUpdateMovieArgs = {
  id: Scalars['ID']['input'];
  input: MovieInput;
};


export type MutationUpdateTvShowArgs = {
  id: Scalars['ID']['input'];
  input: TvShowInput;
};


export type MutationUpsertCollectionArgs = {
  input: CollectionInput;
};


export type MutationUpsertPersonArgs = {
  input: PersonInput;
};


export type MutationUpsertPlatformArgs = {
  input: PlatformInput;
};

export type Person = {
  __typename?: 'Person';
  bio?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** Movies they acted in or directed. */
  movies: Array<Movie>;
  name: Scalars['String']['output'];
  /** TV shows they acted in or created. */
  tvShows: Array<TvShow>;
};

export type PersonInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  popularity?: InputMaybe<Scalars['Int']['input']>;
};

/** A streaming or rental service. */
export type Platform = {
  __typename?: 'Platform';
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** Short pricing label, e.g. 'Subscription'. */
  pricing?: Maybe<Scalars['String']['output']>;
};

export type PlatformInput = {
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  pricing?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  collections: Array<Collection>;
  /** The first trailer of the most recently released titles. */
  latestTrailers: Array<Trailer>;
  movie?: Maybe<Movie>;
  movies: Array<Movie>;
  /** Most popular people first. */
  people: Array<Person>;
  person?: Maybe<Person>;
  platforms: Array<Platform>;
  /** Movies and TV shows whose title, genre, collection or cast contains the query. */
  search: Array<Title>;
  tvShow?: Maybe<TvShow>;
  tvShows: Array<TvShow>;
};


export type QueryCollectionsArgs = {
  kind?: InputMaybe<CollectionKind>;
};


export type QueryLatestTrailersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMoviesArgs = {
  filter?: InputMaybe<TitleFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TitleSort>;
};


export type QueryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPersonArgs = {
  name: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryTvShowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTvShowsArgs = {
  filter?: InputMaybe<TitleFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TitleSort>;
};

export type Ratings = {
  __typename?: 'Ratings';
  /** IMDb rating out of 10. */
  imdb?: Maybe<Scalars['Float']['output']>;
  /** Rotten Tomatoes Tomatometer, 0-100. */
  rottenTomatoes?: Maybe<Scalars['Int']['output']>;
};

export type RatingsInput = {
  imdb?: InputMaybe<Scalars['Float']['input']>;
  rottenTomatoes?: InputMaybe<Scalars['Int']['input']>;
};

export type Season = {
  __typename?: 'Season';
  endDate?: Maybe<Scalars['String']['output']>;
  episodes: Array<Episode>;
  number: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['String']['output']>;
};

export type SeasonInput = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Array<EpisodeInput>>;
  number: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['String']['input']>;
};

/** A movie or TV show. */
export type Title = {
  backdropUrl?: Maybe<Scalars['String']['output']>;
  cast: Array<Credit>;
  certification?: Maybe<Scalars['String']['output']>;
  collections: Array<Scalars['String']['output']>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kind: TitleKind;
  languages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  originalName?: Maybe<Scalars['String']['output']>;
  overview: Scalars['String']['output'];
  posterUrl?: Maybe<Scalars['String']['output']>;
  ratings: Ratings;
  /** ISO 8601 date, e.g. 2010-07-15. */
  releaseDate: Scalars['String']['output'];
  /** Titles of the same kind that share the most genres. */
  similar: Array<Title>;
  trailers: Array<Trailer>;
  watchOptions: Array<WatchOption>;
  year: Scalars['Int']['output'];
};


/** A movie or TV show. */
export type TitleSimilarArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type TitleFilter = {
  collection?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  /** Matches cast members, directors and creators. */
  person?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  watchType?: InputMaybe<WatchType>;
};

export type TitleKind =
  | 'MOVIE'
  | 'TV_SHOW';

export type TitleSort =
  | 'IMDB_RATING_DESC'
  | 'NAME_ASC'
  | 'RELEASE_DATE_DESC';

export type Trailer = {
  __typename?: 'Trailer';
  name: Scalars['String']['output'];
  /** The title this trailer belongs to (set on latestTrailers). */
  title?: Maybe<Title>;
  youtubeId: Scalars['String']['output'];
};

export type TrailerInput = {
  name: Scalars['String']['input'];
  youtubeId: Scalars['String']['input'];
};

export type TvShow = Title & {
  __typename?: 'TvShow';
  backdropUrl?: Maybe<Scalars['String']['output']>;
  cast: Array<Credit>;
  certification?: Maybe<Scalars['String']['output']>;
  collections: Array<Scalars['String']['output']>;
  creators: Array<Credit>;
  genres: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kind: TitleKind;
  languages: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  originalName?: Maybe<Scalars['String']['output']>;
  overview: Scalars['String']['output'];
  posterUrl?: Maybe<Scalars['String']['output']>;
  ratings: Ratings;
  releaseDate: Scalars['String']['output'];
  seasonCount: Scalars['Int']['output'];
  seasons: Array<Season>;
  similar: Array<Title>;
  status?: Maybe<Scalars['String']['output']>;
  trailers: Array<Trailer>;
  watchOptions: Array<WatchOption>;
  year: Scalars['Int']['output'];
};


export type TvShowSimilarArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type TvShowInput = {
  backdropUrl?: InputMaybe<Scalars['String']['input']>;
  cast?: InputMaybe<Array<CastMemberInput>>;
  certification?: InputMaybe<Scalars['String']['input']>;
  collections?: InputMaybe<Array<Scalars['String']['input']>>;
  creators?: InputMaybe<Array<Scalars['String']['input']>>;
  genres?: InputMaybe<Array<Scalars['String']['input']>>;
  languages?: InputMaybe<Array<Scalars['String']['input']>>;
  name: Scalars['String']['input'];
  originalName?: InputMaybe<Scalars['String']['input']>;
  overview: Scalars['String']['input'];
  posterUrl?: InputMaybe<Scalars['String']['input']>;
  ratings?: InputMaybe<RatingsInput>;
  releaseDate: Scalars['String']['input'];
  seasonCount?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  trailers?: InputMaybe<Array<TrailerInput>>;
  watchOptions?: InputMaybe<Array<WatchOptionInput>>;
};

export type WatchOption = {
  __typename?: 'WatchOption';
  platform: Platform;
  type: WatchType;
  url: Scalars['String']['output'];
};

export type WatchOptionInput = {
  platform: Scalars['String']['input'];
  type: WatchType;
  url: Scalars['String']['input'];
};

export type WatchType =
  | 'BUY'
  | 'FREE'
  | 'RENT'
  | 'SUBSCRIPTION';

export type CollectionsQueryVariables = Exact<{
  kind?: InputMaybe<CollectionKind>;
}>;


export type CollectionsQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', name: string, kind: CollectionKind, imageUrl?: string | null }> };

export type PeopleQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type PeopleQuery = { __typename?: 'Query', people: Array<{ __typename?: 'Person', name: string, imageUrl?: string | null }> };

export type PersonQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type PersonQuery = { __typename?: 'Query', person?: { __typename?: 'Person', name: string, imageUrl?: string | null, bio?: string | null, movies: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }>, tvShows: Array<{ __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }> } | null };

type TitleCard_Movie_Fragment = { __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> };

type TitleCard_TvShow_Fragment = { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> };

export type TitleCardFragment = TitleCard_Movie_Fragment | TitleCard_TvShow_Fragment;

type TitleSpotlight_Movie_Fragment = { __typename?: 'Movie', id: string, kind: TitleKind, name: string, overview: string, backdropUrl?: string | null, posterUrl?: string | null, releaseDate: string, genres: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null } };

type TitleSpotlight_TvShow_Fragment = { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, overview: string, backdropUrl?: string | null, posterUrl?: string | null, releaseDate: string, genres: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null } };

export type TitleSpotlightFragment = TitleSpotlight_Movie_Fragment | TitleSpotlight_TvShow_Fragment;

export type CreditFieldsFragment = { __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null };

type TitleDetails_Movie_Fragment = { __typename?: 'Movie', id: string, kind: TitleKind, name: string, originalName?: string | null, overview: string, posterUrl?: string | null, backdropUrl?: string | null, releaseDate: string, year: number, certification?: string | null, genres: Array<string>, languages: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null, rottenTomatoes?: number | null }, cast: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, trailers: Array<{ __typename?: 'Trailer', name: string, youtubeId: string }>, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, url: string, platform: { __typename?: 'Platform', name: string, logoUrl?: string | null, pricing?: string | null } }> };

type TitleDetails_TvShow_Fragment = { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, originalName?: string | null, overview: string, posterUrl?: string | null, backdropUrl?: string | null, releaseDate: string, year: number, certification?: string | null, genres: Array<string>, languages: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null, rottenTomatoes?: number | null }, cast: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, trailers: Array<{ __typename?: 'Trailer', name: string, youtubeId: string }>, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, url: string, platform: { __typename?: 'Platform', name: string, logoUrl?: string | null, pricing?: string | null } }> };

export type TitleDetailsFragment = TitleDetails_Movie_Fragment | TitleDetails_TvShow_Fragment;

export type MoviesQueryVariables = Exact<{
  filter?: InputMaybe<TitleFilter>;
  sort?: InputMaybe<TitleSort>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }> };

export type TvShowsQueryVariables = Exact<{
  filter?: InputMaybe<TitleFilter>;
  sort?: InputMaybe<TitleSort>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TvShowsQuery = { __typename?: 'Query', tvShows: Array<{ __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }> };

export type SpotlightMoviesQueryVariables = Exact<{
  sort?: InputMaybe<TitleSort>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SpotlightMoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, overview: string, backdropUrl?: string | null, posterUrl?: string | null, releaseDate: string, genres: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null } }> };

export type SpotlightTvShowsQueryVariables = Exact<{
  sort?: InputMaybe<TitleSort>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SpotlightTvShowsQuery = { __typename?: 'Query', tvShows: Array<{ __typename?: 'TvShow', id: string, kind: TitleKind, name: string, overview: string, backdropUrl?: string | null, posterUrl?: string | null, releaseDate: string, genres: Array<string>, ratings: { __typename?: 'Ratings', imdb?: number | null } }> };

export type MovieDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MovieDetailsQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', runtimeMinutes?: number | null, id: string, kind: TitleKind, name: string, originalName?: string | null, overview: string, posterUrl?: string | null, backdropUrl?: string | null, releaseDate: string, year: number, certification?: string | null, genres: Array<string>, languages: Array<string>, directors: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, similar: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> } | { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }>, ratings: { __typename?: 'Ratings', imdb?: number | null, rottenTomatoes?: number | null }, cast: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, trailers: Array<{ __typename?: 'Trailer', name: string, youtubeId: string }>, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, url: string, platform: { __typename?: 'Platform', name: string, logoUrl?: string | null, pricing?: string | null } }> } | null };

export type TvShowDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TvShowDetailsQuery = { __typename?: 'Query', tvShow?: { __typename?: 'TvShow', status?: string | null, seasonCount: number, id: string, kind: TitleKind, name: string, originalName?: string | null, overview: string, posterUrl?: string | null, backdropUrl?: string | null, releaseDate: string, year: number, certification?: string | null, genres: Array<string>, languages: Array<string>, creators: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, seasons: Array<{ __typename?: 'Season', number: number, startDate?: string | null, endDate?: string | null, episodes: Array<{ __typename?: 'Episode', number: number, name: string, overview?: string | null, runtimeMinutes?: number | null }> }>, similar: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> } | { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }>, ratings: { __typename?: 'Ratings', imdb?: number | null, rottenTomatoes?: number | null }, cast: Array<{ __typename?: 'Credit', name: string, role?: string | null, person?: { __typename?: 'Person', imageUrl?: string | null } | null }>, trailers: Array<{ __typename?: 'Trailer', name: string, youtubeId: string }>, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, url: string, platform: { __typename?: 'Platform', name: string, logoUrl?: string | null, pricing?: string | null } }> } | null };

export type LatestTrailersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LatestTrailersQuery = { __typename?: 'Query', latestTrailers: Array<{ __typename?: 'Trailer', name: string, youtubeId: string, title?: { __typename?: 'Movie', id: string, kind: TitleKind, name: string } | { __typename?: 'TvShow', id: string, kind: TitleKind, name: string } | null }> };

export type SearchTitlesQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchTitlesQuery = { __typename?: 'Query', search: Array<{ __typename?: 'Movie', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> } | { __typename?: 'TvShow', id: string, kind: TitleKind, name: string, posterUrl?: string | null, releaseDate: string, ratings: { __typename?: 'Ratings', imdb?: number | null }, watchOptions: Array<{ __typename?: 'WatchOption', type: WatchType, platform: { __typename?: 'Platform', name: string } }> }> };

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