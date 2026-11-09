import gql from "graphql-tag";

export const titleTypeDefs = gql`
  enum TitleKind {
    MOVIE
    TV_SHOW
  }

  enum WatchType {
    SUBSCRIPTION
    FREE
    RENT
    BUY
  }

  enum TitleSort {
    RELEASE_DATE_DESC
    IMDB_RATING_DESC
    NAME_ASC
  }

  type Ratings {
    "IMDb rating out of 10."
    imdb: Float
    "Rotten Tomatoes Tomatometer, 0-100."
    rottenTomatoes: Int
  }

  "A person's credit on a title: a cast role, or a director or creator."
  type Credit {
    name: String!
    "Character name for cast members; 'Director' or 'Creator' for crew."
    role: String
    person: Person
  }

  type Trailer {
    name: String!
    youtubeId: String!
    "The title this trailer belongs to (set on latestTrailers)."
    title: Title
  }

  type WatchOption {
    platform: Platform!
    type: WatchType!
    url: String!
  }

  "A movie or TV show."
  interface Title {
    id: ID!
    kind: TitleKind!
    name: String!
    originalName: String
    overview: String!
    posterUrl: String
    backdropUrl: String
    "ISO 8601 date, e.g. 2010-07-15."
    releaseDate: String!
    year: Int!
    certification: String
    genres: [String!]!
    collections: [String!]!
    languages: [String!]!
    ratings: Ratings!
    cast: [Credit!]!
    trailers: [Trailer!]!
    watchOptions: [WatchOption!]!
    "Titles of the same kind that share the most genres."
    similar(limit: Int = 12): [Title!]!
  }

  type Movie implements Title {
    id: ID!
    kind: TitleKind!
    name: String!
    originalName: String
    overview: String!
    posterUrl: String
    backdropUrl: String
    releaseDate: String!
    year: Int!
    certification: String
    genres: [String!]!
    collections: [String!]!
    languages: [String!]!
    ratings: Ratings!
    cast: [Credit!]!
    trailers: [Trailer!]!
    watchOptions: [WatchOption!]!
    similar(limit: Int = 12): [Title!]!
    runtimeMinutes: Int
    directors: [Credit!]!
  }

  type TvShow implements Title {
    id: ID!
    kind: TitleKind!
    name: String!
    originalName: String
    overview: String!
    posterUrl: String
    backdropUrl: String
    releaseDate: String!
    year: Int!
    certification: String
    genres: [String!]!
    collections: [String!]!
    languages: [String!]!
    ratings: Ratings!
    cast: [Credit!]!
    trailers: [Trailer!]!
    watchOptions: [WatchOption!]!
    similar(limit: Int = 12): [Title!]!
    creators: [Credit!]!
    status: String
    seasonCount: Int!
    seasons: [Season!]!
  }

  type Episode {
    number: Int!
    name: String!
    overview: String
    runtimeMinutes: Int
  }

  type Season {
    number: Int!
    startDate: String
    endDate: String
    episodes: [Episode!]!
  }

  input TitleFilter {
    genre: String
    collection: String
    "Matches cast members, directors and creators."
    person: String
    platform: String
    watchType: WatchType
  }

  input RatingsInput {
    imdb: Float
    rottenTomatoes: Int
  }

  input CastMemberInput {
    name: String!
    character: String
  }

  input TrailerInput {
    name: String!
    youtubeId: String!
  }

  input WatchOptionInput {
    platform: String!
    type: WatchType!
    url: String!
  }

  input MovieInput {
    name: String!
    originalName: String
    overview: String!
    posterUrl: String
    backdropUrl: String
    releaseDate: String!
    certification: String
    genres: [String!]
    collections: [String!]
    languages: [String!]
    ratings: RatingsInput
    cast: [CastMemberInput!]
    trailers: [TrailerInput!]
    watchOptions: [WatchOptionInput!]
    runtimeMinutes: Int
    directors: [String!]
  }

  input TvShowInput {
    name: String!
    originalName: String
    overview: String!
    posterUrl: String
    backdropUrl: String
    releaseDate: String!
    certification: String
    genres: [String!]
    collections: [String!]
    languages: [String!]
    ratings: RatingsInput
    cast: [CastMemberInput!]
    trailers: [TrailerInput!]
    watchOptions: [WatchOptionInput!]
    creators: [String!]
    status: String
    seasonCount: Int
  }

  input EpisodeInput {
    number: Int!
    name: String!
    overview: String
    runtimeMinutes: Int
  }

  input SeasonInput {
    number: Int!
    startDate: String
    endDate: String
    episodes: [EpisodeInput!]
  }

  extend type Query {
    movies(filter: TitleFilter, sort: TitleSort = RELEASE_DATE_DESC, limit: Int = 20): [Movie!]!
    movie(id: ID!): Movie
    tvShows(filter: TitleFilter, sort: TitleSort = RELEASE_DATE_DESC, limit: Int = 20): [TvShow!]!
    tvShow(id: ID!): TvShow
    "Movies and TV shows whose title, genre, collection or cast contains the query."
    search(query: String!, limit: Int = 20): [Title!]!
    "The first trailer of the most recently released titles."
    latestTrailers(limit: Int = 5): [Trailer!]!
  }

  extend type Mutation {
    createMovie(input: MovieInput!): Movie!
    "Replaces every field of the movie."
    updateMovie(id: ID!, input: MovieInput!): Movie!
    deleteMovie(id: ID!): ID!
    createTvShow(input: TvShowInput!): TvShow!
    updateTvShow(id: ID!, input: TvShowInput!): TvShow!
    "Also deletes the show's seasons."
    deleteTvShow(id: ID!): ID!
    "Creates or replaces the season with this number."
    setSeason(tvShowId: ID!, input: SeasonInput!): Season!
    deleteSeason(tvShowId: ID!, number: Int!): Boolean!
  }
`;
