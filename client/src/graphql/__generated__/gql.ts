/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Collections($kind: CollectionKind) {\n    collections(kind: $kind) {\n      name\n      kind\n      imageUrl\n    }\n  }\n": typeof types.CollectionsDocument,
    "\n  query People($limit: Int) {\n    people(limit: $limit) {\n      name\n      imageUrl\n    }\n  }\n": typeof types.PeopleDocument,
    "\n  query Person($name: String!) {\n    person(name: $name) {\n      name\n      imageUrl\n      bio\n      movies {\n        ...TitleCard\n      }\n      tvShows {\n        ...TitleCard\n      }\n    }\n  }\n": typeof types.PersonDocument,
    "\n  fragment TitleCard on Title {\n    id\n    kind\n    name\n    posterUrl\n    releaseDate\n    ratings {\n      imdb\n    }\n    watchOptions {\n      type\n      platform {\n        name\n      }\n    }\n  }\n": typeof types.TitleCardFragmentDoc,
    "\n  fragment TitleSpotlight on Title {\n    id\n    kind\n    name\n    overview\n    backdropUrl\n    posterUrl\n    releaseDate\n    genres\n    ratings {\n      imdb\n    }\n  }\n": typeof types.TitleSpotlightFragmentDoc,
    "\n  fragment CreditFields on Credit {\n    name\n    role\n    person {\n      imageUrl\n    }\n  }\n": typeof types.CreditFieldsFragmentDoc,
    "\n  fragment TitleDetails on Title {\n    id\n    kind\n    name\n    originalName\n    overview\n    posterUrl\n    backdropUrl\n    releaseDate\n    year\n    certification\n    genres\n    languages\n    ratings {\n      imdb\n      rottenTomatoes\n    }\n    cast {\n      ...CreditFields\n    }\n    trailers {\n      name\n      youtubeId\n    }\n    watchOptions {\n      type\n      url\n      platform {\n        name\n        logoUrl\n        pricing\n      }\n    }\n  }\n": typeof types.TitleDetailsFragmentDoc,
    "\n  query Movies($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    movies(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n": typeof types.MoviesDocument,
    "\n  query TvShows($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    tvShows(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n": typeof types.TvShowsDocument,
    "\n  query SpotlightMovies($sort: TitleSort, $limit: Int) {\n    movies(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n": typeof types.SpotlightMoviesDocument,
    "\n  query SpotlightTvShows($sort: TitleSort, $limit: Int) {\n    tvShows(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n": typeof types.SpotlightTvShowsDocument,
    "\n  query MovieDetails($id: ID!) {\n    movie(id: $id) {\n      ...TitleDetails\n      runtimeMinutes\n      directors {\n        ...CreditFields\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n": typeof types.MovieDetailsDocument,
    "\n  query TvShowDetails($id: ID!) {\n    tvShow(id: $id) {\n      ...TitleDetails\n      status\n      seasonCount\n      creators {\n        ...CreditFields\n      }\n      seasons {\n        number\n        startDate\n        endDate\n        episodes {\n          number\n          name\n          overview\n          runtimeMinutes\n        }\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n": typeof types.TvShowDetailsDocument,
    "\n  query LatestTrailers($limit: Int) {\n    latestTrailers(limit: $limit) {\n      name\n      youtubeId\n      title {\n        id\n        kind\n        name\n      }\n    }\n  }\n": typeof types.LatestTrailersDocument,
    "\n  query SearchTitles($query: String!) {\n    search(query: $query, limit: 40) {\n      ...TitleCard\n    }\n  }\n": typeof types.SearchTitlesDocument,
};
const documents: Documents = {
    "\n  query Collections($kind: CollectionKind) {\n    collections(kind: $kind) {\n      name\n      kind\n      imageUrl\n    }\n  }\n": types.CollectionsDocument,
    "\n  query People($limit: Int) {\n    people(limit: $limit) {\n      name\n      imageUrl\n    }\n  }\n": types.PeopleDocument,
    "\n  query Person($name: String!) {\n    person(name: $name) {\n      name\n      imageUrl\n      bio\n      movies {\n        ...TitleCard\n      }\n      tvShows {\n        ...TitleCard\n      }\n    }\n  }\n": types.PersonDocument,
    "\n  fragment TitleCard on Title {\n    id\n    kind\n    name\n    posterUrl\n    releaseDate\n    ratings {\n      imdb\n    }\n    watchOptions {\n      type\n      platform {\n        name\n      }\n    }\n  }\n": types.TitleCardFragmentDoc,
    "\n  fragment TitleSpotlight on Title {\n    id\n    kind\n    name\n    overview\n    backdropUrl\n    posterUrl\n    releaseDate\n    genres\n    ratings {\n      imdb\n    }\n  }\n": types.TitleSpotlightFragmentDoc,
    "\n  fragment CreditFields on Credit {\n    name\n    role\n    person {\n      imageUrl\n    }\n  }\n": types.CreditFieldsFragmentDoc,
    "\n  fragment TitleDetails on Title {\n    id\n    kind\n    name\n    originalName\n    overview\n    posterUrl\n    backdropUrl\n    releaseDate\n    year\n    certification\n    genres\n    languages\n    ratings {\n      imdb\n      rottenTomatoes\n    }\n    cast {\n      ...CreditFields\n    }\n    trailers {\n      name\n      youtubeId\n    }\n    watchOptions {\n      type\n      url\n      platform {\n        name\n        logoUrl\n        pricing\n      }\n    }\n  }\n": types.TitleDetailsFragmentDoc,
    "\n  query Movies($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    movies(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n": types.MoviesDocument,
    "\n  query TvShows($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    tvShows(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n": types.TvShowsDocument,
    "\n  query SpotlightMovies($sort: TitleSort, $limit: Int) {\n    movies(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n": types.SpotlightMoviesDocument,
    "\n  query SpotlightTvShows($sort: TitleSort, $limit: Int) {\n    tvShows(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n": types.SpotlightTvShowsDocument,
    "\n  query MovieDetails($id: ID!) {\n    movie(id: $id) {\n      ...TitleDetails\n      runtimeMinutes\n      directors {\n        ...CreditFields\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n": types.MovieDetailsDocument,
    "\n  query TvShowDetails($id: ID!) {\n    tvShow(id: $id) {\n      ...TitleDetails\n      status\n      seasonCount\n      creators {\n        ...CreditFields\n      }\n      seasons {\n        number\n        startDate\n        endDate\n        episodes {\n          number\n          name\n          overview\n          runtimeMinutes\n        }\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n": types.TvShowDetailsDocument,
    "\n  query LatestTrailers($limit: Int) {\n    latestTrailers(limit: $limit) {\n      name\n      youtubeId\n      title {\n        id\n        kind\n        name\n      }\n    }\n  }\n": types.LatestTrailersDocument,
    "\n  query SearchTitles($query: String!) {\n    search(query: $query, limit: 40) {\n      ...TitleCard\n    }\n  }\n": types.SearchTitlesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Collections($kind: CollectionKind) {\n    collections(kind: $kind) {\n      name\n      kind\n      imageUrl\n    }\n  }\n"): typeof import('./graphql').CollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query People($limit: Int) {\n    people(limit: $limit) {\n      name\n      imageUrl\n    }\n  }\n"): typeof import('./graphql').PeopleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Person($name: String!) {\n    person(name: $name) {\n      name\n      imageUrl\n      bio\n      movies {\n        ...TitleCard\n      }\n      tvShows {\n        ...TitleCard\n      }\n    }\n  }\n"): typeof import('./graphql').PersonDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TitleCard on Title {\n    id\n    kind\n    name\n    posterUrl\n    releaseDate\n    ratings {\n      imdb\n    }\n    watchOptions {\n      type\n      platform {\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').TitleCardFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TitleSpotlight on Title {\n    id\n    kind\n    name\n    overview\n    backdropUrl\n    posterUrl\n    releaseDate\n    genres\n    ratings {\n      imdb\n    }\n  }\n"): typeof import('./graphql').TitleSpotlightFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CreditFields on Credit {\n    name\n    role\n    person {\n      imageUrl\n    }\n  }\n"): typeof import('./graphql').CreditFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TitleDetails on Title {\n    id\n    kind\n    name\n    originalName\n    overview\n    posterUrl\n    backdropUrl\n    releaseDate\n    year\n    certification\n    genres\n    languages\n    ratings {\n      imdb\n      rottenTomatoes\n    }\n    cast {\n      ...CreditFields\n    }\n    trailers {\n      name\n      youtubeId\n    }\n    watchOptions {\n      type\n      url\n      platform {\n        name\n        logoUrl\n        pricing\n      }\n    }\n  }\n"): typeof import('./graphql').TitleDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Movies($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    movies(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n"): typeof import('./graphql').MoviesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TvShows($filter: TitleFilter, $sort: TitleSort, $limit: Int) {\n    tvShows(filter: $filter, sort: $sort, limit: $limit) {\n      ...TitleCard\n    }\n  }\n"): typeof import('./graphql').TvShowsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SpotlightMovies($sort: TitleSort, $limit: Int) {\n    movies(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n"): typeof import('./graphql').SpotlightMoviesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SpotlightTvShows($sort: TitleSort, $limit: Int) {\n    tvShows(sort: $sort, limit: $limit) {\n      ...TitleSpotlight\n    }\n  }\n"): typeof import('./graphql').SpotlightTvShowsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MovieDetails($id: ID!) {\n    movie(id: $id) {\n      ...TitleDetails\n      runtimeMinutes\n      directors {\n        ...CreditFields\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n"): typeof import('./graphql').MovieDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TvShowDetails($id: ID!) {\n    tvShow(id: $id) {\n      ...TitleDetails\n      status\n      seasonCount\n      creators {\n        ...CreditFields\n      }\n      seasons {\n        number\n        startDate\n        endDate\n        episodes {\n          number\n          name\n          overview\n          runtimeMinutes\n        }\n      }\n      similar(limit: 12) {\n        ...TitleCard\n      }\n    }\n  }\n"): typeof import('./graphql').TvShowDetailsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LatestTrailers($limit: Int) {\n    latestTrailers(limit: $limit) {\n      name\n      youtubeId\n      title {\n        id\n        kind\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').LatestTrailersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchTitles($query: String!) {\n    search(query: $query, limit: 40) {\n      ...TitleCard\n    }\n  }\n"): typeof import('./graphql').SearchTitlesDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
