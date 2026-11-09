import type { GraphQLResolveInfo } from 'graphql';
import type { Title as TitleModel, Movie as MovieModel, TvShow as TvShowModel, Season as SeasonModel, TrailerParent as TrailerParentModel, WatchOption as WatchOptionModel, CreditParent as CreditParentModel } from '../../modules/titles/title.types';
import type { Person as PersonModel } from '../../modules/people/person';
import type { Platform as PlatformModel, Collection as CollectionModel } from '../../modules/catalog/catalog';
import type { GraphQLContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CastMemberInput: CastMemberInput;
  Collection: ResolverTypeWrapper<CollectionModel>;
  CollectionInput: CollectionInput;
  CollectionKind: CollectionKind;
  Credit: ResolverTypeWrapper<CreditParentModel>;
  Episode: ResolverTypeWrapper<Episode>;
  EpisodeInput: EpisodeInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Movie: ResolverTypeWrapper<MovieModel>;
  MovieInput: MovieInput;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<PersonModel>;
  PersonInput: PersonInput;
  Platform: ResolverTypeWrapper<PlatformModel>;
  PlatformInput: PlatformInput;
  Query: ResolverTypeWrapper<{}>;
  Ratings: ResolverTypeWrapper<Ratings>;
  RatingsInput: RatingsInput;
  Season: ResolverTypeWrapper<SeasonModel>;
  SeasonInput: SeasonInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Title: ResolverTypeWrapper<TitleModel>;
  TitleFilter: TitleFilter;
  TitleKind: TitleKind;
  TitleSort: TitleSort;
  Trailer: ResolverTypeWrapper<TrailerParentModel>;
  TrailerInput: TrailerInput;
  TvShow: ResolverTypeWrapper<TvShowModel>;
  TvShowInput: TvShowInput;
  WatchOption: ResolverTypeWrapper<WatchOptionModel>;
  WatchOptionInput: WatchOptionInput;
  WatchType: WatchType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CastMemberInput: CastMemberInput;
  Collection: CollectionModel;
  CollectionInput: CollectionInput;
  Credit: CreditParentModel;
  Episode: Episode;
  EpisodeInput: EpisodeInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Movie: MovieModel;
  MovieInput: MovieInput;
  Mutation: {};
  Person: PersonModel;
  PersonInput: PersonInput;
  Platform: PlatformModel;
  PlatformInput: PlatformInput;
  Query: {};
  Ratings: Ratings;
  RatingsInput: RatingsInput;
  Season: SeasonModel;
  SeasonInput: SeasonInput;
  String: Scalars['String']['output'];
  Title: TitleModel;
  TitleFilter: TitleFilter;
  Trailer: TrailerParentModel;
  TrailerInput: TrailerInput;
  TvShow: TvShowModel;
  TvShowInput: TvShowInput;
  WatchOption: WatchOptionModel;
  WatchOptionInput: WatchOptionInput;
};

export type CollectionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['CollectionKind'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreditResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Credit'] = ResolversParentTypes['Credit']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpisodeResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  overview?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  runtimeMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MovieResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = {
  backdropUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['Credit']>, ParentType, ContextType>;
  certification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  directors?: Resolver<Array<ResolversTypes['Credit']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['TitleKind'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ratings?: Resolver<ResolversTypes['Ratings'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  runtimeMinutes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['Title']>, ParentType, ContextType, RequireFields<MovieSimilarArgs, 'limit'>>;
  trailers?: Resolver<Array<ResolversTypes['Trailer']>, ParentType, ContextType>;
  watchOptions?: Resolver<Array<ResolversTypes['WatchOption']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<MutationCreateMovieArgs, 'input'>>;
  createTvShow?: Resolver<ResolversTypes['TvShow'], ParentType, ContextType, RequireFields<MutationCreateTvShowArgs, 'input'>>;
  deleteCollection?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCollectionArgs, 'name'>>;
  deleteMovie?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id'>>;
  deletePerson?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePersonArgs, 'name'>>;
  deletePlatform?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeletePlatformArgs, 'name'>>;
  deleteSeason?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteSeasonArgs, 'number' | 'tvShowId'>>;
  deleteTvShow?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTvShowArgs, 'id'>>;
  setSeason?: Resolver<ResolversTypes['Season'], ParentType, ContextType, RequireFields<MutationSetSeasonArgs, 'input' | 'tvShowId'>>;
  updateMovie?: Resolver<ResolversTypes['Movie'], ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id' | 'input'>>;
  updateTvShow?: Resolver<ResolversTypes['TvShow'], ParentType, ContextType, RequireFields<MutationUpdateTvShowArgs, 'id' | 'input'>>;
  upsertCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationUpsertCollectionArgs, 'input'>>;
  upsertPerson?: Resolver<ResolversTypes['Person'], ParentType, ContextType, RequireFields<MutationUpsertPersonArgs, 'input'>>;
  upsertPlatform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType, RequireFields<MutationUpsertPlatformArgs, 'input'>>;
};

export type PersonResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tvShows?: Resolver<Array<ResolversTypes['TvShow']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlatformResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Platform'] = ResolversParentTypes['Platform']> = {
  logoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pricing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType, Partial<QueryCollectionsArgs>>;
  latestTrailers?: Resolver<Array<ResolversTypes['Trailer']>, ParentType, ContextType, RequireFields<QueryLatestTrailersArgs, 'limit'>>;
  movie?: Resolver<Maybe<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMovieArgs, 'id'>>;
  movies?: Resolver<Array<ResolversTypes['Movie']>, ParentType, ContextType, RequireFields<QueryMoviesArgs, 'limit' | 'sort'>>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPeopleArgs, 'limit'>>;
  person?: Resolver<Maybe<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'name'>>;
  platforms?: Resolver<Array<ResolversTypes['Platform']>, ParentType, ContextType>;
  search?: Resolver<Array<ResolversTypes['Title']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'limit' | 'query'>>;
  tvShow?: Resolver<Maybe<ResolversTypes['TvShow']>, ParentType, ContextType, RequireFields<QueryTvShowArgs, 'id'>>;
  tvShows?: Resolver<Array<ResolversTypes['TvShow']>, ParentType, ContextType, RequireFields<QueryTvShowsArgs, 'limit' | 'sort'>>;
};

export type RatingsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Ratings'] = ResolversParentTypes['Ratings']> = {
  imdb?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rottenTomatoes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeasonResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Season'] = ResolversParentTypes['Season']> = {
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  episodes?: Resolver<Array<ResolversTypes['Episode']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TitleResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Title'] = ResolversParentTypes['Title']> = {
  __resolveType: TypeResolveFn<'Movie' | 'TvShow', ParentType, ContextType>;
  backdropUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['Credit']>, ParentType, ContextType>;
  certification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['TitleKind'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ratings?: Resolver<ResolversTypes['Ratings'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['Title']>, ParentType, ContextType, RequireFields<TitleSimilarArgs, 'limit'>>;
  trailers?: Resolver<Array<ResolversTypes['Trailer']>, ParentType, ContextType>;
  watchOptions?: Resolver<Array<ResolversTypes['WatchOption']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type TrailerResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Trailer'] = ResolversParentTypes['Trailer']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['Title']>, ParentType, ContextType>;
  youtubeId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TvShowResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TvShow'] = ResolversParentTypes['TvShow']> = {
  backdropUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cast?: Resolver<Array<ResolversTypes['Credit']>, ParentType, ContextType>;
  certification?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collections?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  creators?: Resolver<Array<ResolversTypes['Credit']>, ParentType, ContextType>;
  genres?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['TitleKind'], ParentType, ContextType>;
  languages?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  overview?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posterUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ratings?: Resolver<ResolversTypes['Ratings'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seasonCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  seasons?: Resolver<Array<ResolversTypes['Season']>, ParentType, ContextType>;
  similar?: Resolver<Array<ResolversTypes['Title']>, ParentType, ContextType, RequireFields<TvShowSimilarArgs, 'limit'>>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trailers?: Resolver<Array<ResolversTypes['Trailer']>, ParentType, ContextType>;
  watchOptions?: Resolver<Array<ResolversTypes['WatchOption']>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WatchOptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WatchOption'] = ResolversParentTypes['WatchOption']> = {
  platform?: Resolver<ResolversTypes['Platform'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['WatchType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Collection?: CollectionResolvers<ContextType>;
  Credit?: CreditResolvers<ContextType>;
  Episode?: EpisodeResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Platform?: PlatformResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Ratings?: RatingsResolvers<ContextType>;
  Season?: SeasonResolvers<ContextType>;
  Title?: TitleResolvers<ContextType>;
  Trailer?: TrailerResolvers<ContextType>;
  TvShow?: TvShowResolvers<ContextType>;
  WatchOption?: WatchOptionResolvers<ContextType>;
};

