const {
  gql,
  makeExecutableSchema,
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");


const Movie = require("./models/movie").Movies;
const Actor = require("./models/Actors").Actors;
const Collection = require("./models/Collections").Collections;
const Ott = require("./models/Ott").OttDetails;
const Trailer = require("./models/trailers").TrailerDetails;
const TVShow = require("./models/tvshows").TVShows;
const Season = require("./models/seasons").Seasons;



const typeDefs = gql`
  #Actors
  type ActorSchema {
    name: String!
    changedName: String!
    description: String!
    image: String!
  }


  input ActorSchemaInput {
    name: String!
    description: String!
    image: String!
  }

  #Trailer
  type TrailerSchema {
    name: String!
    changedName: String!
    link: String!
    date: String!
  }


  input TrailerSchemaInput {
    name: String!
    link: String!
    date: String!
  }

  type CollectionsSchema {
    name: String!
    changedName: String!
    image: String!
    type:String!
  }

  input CollectionsSchemaInput {
    name: String!
    image: String!
    type:String!
  }

 #Actors
 type OttSchema {
    name: String!
    changedName: String!
    image: String!
    perMonth: String!
  }


  type genreSchema {
    genre: String!
    
  }

  input genreSchemaInput {
    genre: String!
  }

  type creatorSchema {
    creator: String! 
  }

  input creatorSchemaInput {
    creator: String!
  }

  type ratingSchema1 {
    rating: String! 
  }

  
  type ratingSchemaMovie {
    rating: String! 
  }

  input ratingSchemaMovieInput {
    rating: String! 
  }

  type videosSchema {
    title: String!
    link: String! 
    date: String! 
  }

  input videosSchemaInput {
    title: String!
    link: String! 
    date: String! 
  }

  type directorSchemaMovie {
    director: String! 
  }
  input directorSchemaMovieInput {
    director: String! 
  }

  input ratingSchemaInput1 {
    rating: String!
  }


  type genreSchemaTvshows {
    genre: String!
    
  }

  input genreSchemaTvshowsInput {
    genre: String!
  }

  # CastSchema
  type CastSchema {
    castName: String!
    CharacterName: String!
  }

  input CastSchemaInput {
    castName: String!
    CharacterName: String!
  }

  # RectanglePostersSchema
  type RectanglePostersSchema {
    rectanglePosters: String!
  }

  input RectanglePostersSchemaInput {
    rectanglePosters: String!
  }

    # watchOnSchema
    type watchOnSchema {
      watchOnLink: String!
      watchOn: String!
  }

  input watchOnSchemaInput {
    watchOnLink: String!
    watchOn: String!
  }

  # ratingSchema
  type ratingSchema {
    imdb: String!
    rottenTomatoes: String!
    mydramalist:String!
  }

  input ratingSchemaInput {
    imdb: String!
    rottenTomatoes: String!
    mydramalist:String!
  }

  # postersSchema
  type postersSchema {
    posters: String!
  }

  input postersSchemaInput {
    posters: String!
  }

  # movieInfoSchema
  type movieInfoSchema {
    rating: [ratingSchemaMovie]!
    director: [directorSchemaMovie]!
    link: [videosSchema]!
    originalTitle: String!
    runtime: String!
    genre:  [genreSchema]!
    releaseDate: String!
    dateFormat: String!
  }

  input movieInfoSchemaInput {
    rating: [ratingSchemaMovieInput]!
    director: [directorSchemaMovieInput]!
    link: [videosSchemaInput]!
    originalTitle: String!
    runtime: String!
    genre:   [genreSchemaInput]!
    releaseDate: String!
    dateFormat: String!
  }
  # availLanguagesSchema
  type availLanguagesSchema {
    languages: String!
  }
  input availLanguagesSchemaInput {
    languages: String!
  }


  # Tvshows

  # CastSchema
  type castSchemaTvshow {
    castName: String!
    CharacterName: String!
  }

  input castSchemaTvshowInputs {
    castName: String!
    CharacterName: String!
  }

    # postersSchema
    type postersSchemaTvshow {
    posters: String!
  }

  input postersSchemaTvshowInput {
    posters: String!
  }

    # ratingSchema
    type ratingSchemaTvshow {
    imdb: String!
    rottenTomatoes: String!
    mydramalist:String!
  }

  input ratingSchemaTvshowInput {
    imdb: String!
    rottenTomatoes: String!
    mydramalist:String!
  }

  type videosTvSchema {
    title: String!
    link: String!
    date: String!
  }


  input videosTvSchemaInput {
    title: String!
    link: String!
    date: String!
  }

  type watchOnSchemaTvshow {
      watchOnLink: String!
      watchOn: String!
  }

  input watchOnSchemaTvshowInput {
    watchOnLink: String!
    watchOn: String!
  }

    # RectanglePostersSchema
    type RectanglePostersSchemaTvshow {
    rectanglePosters: String!
  }

  input RectanglePostersSchemaTvshowInput {
    rectanglePosters: String!
  }


  # movieInfoSchema
  type tvshowInfoSchema {
    rating: [ratingSchema1]!
    creator: [creatorSchema]!
    link: [videosTvSchema]!
    writer: String!
    genre:  [genreSchemaTvshows]!
    originalTitle: String!
    noOfseasons: String!
    status: String!
    releaseDate: String!
    dateFormat: String!
  }
  
  input tvshowInfoSchemaInput {
    rating: [ratingSchemaInput1]!
    creator: [creatorSchemaInput]!
    link: [videosTvSchemaInput]!
    writer: String!
    genre:   [genreSchemaTvshowsInput]!
    originalTitle: String!
    noOfseasons: String!
    status: String!
    releaseDate: String!
    dateFormat: String!
  }
  
  type availLanguagesSchemaTvshow {
    languages: String!
  }
  input availLanguagesSchemaTvshowInput {
    languages: String!
  }

  union Owner = Tvshows | Movie

  type Tvshows {
    id: ID!
    Type: String!
    name: String!
    storyline: String!
    casts: [castSchemaTvshow]!
    rating: [ratingSchemaTvshow]!
    posters: [postersSchemaTvshow]!
    rectanglePosters: [RectanglePostersSchemaTvshow]!
    watchOn: [watchOnSchemaTvshow]!
    tvshowInfo: [tvshowInfoSchema]!
    availLanguages: [availLanguagesSchemaTvshow]!
  }

  type Movie {
    id: ID!
    name: String!
    storyline: String!
    casts: [CastSchema]!
    rating: [ratingSchema]!
    posters: [postersSchema]!
    rectanglePosters: [RectanglePostersSchema]!
    watchOn: [watchOnSchema]!
    movieInfo: [movieInfoSchema]!
    availLanguages: [availLanguagesSchema]!
  }


  #Seasons

  # watchOnSchemaSeason
  type watchOnSchemaSeason {
    episodeName: String!
    episodeDescription: String!
    episodeDuration: String!

  }
  input watchOnSchemaSeasonInput {
    episodeName: String!
    episodeDescription: String!
    episodeDuration: String!
  }

  type Seasons {
    seasonId: String!
    name: String!
    season: String!
    seasonStart: String!
    seasonEnd: String!
    episodes: [watchOnSchemaSeason]!
  }

  type Event {
    name: String!
    owner: Owner
}

  type Query {

    getMovies:[Movie]
    getMovie(name: String!): [Movie]
    searchMovie(name: String!): [Movie]
    searchMovieautoComplete(name: String!): [Movie]
    searchActorMovie(casts: String!): [Movie]
    searchActorTvshows(casts: String!): [Tvshows]
    searchTvshows(name: String!): [Tvshows]
    getTVshows:[Tvshows]
    getTVshow(name: String!): [Tvshows]
    getTVshow1(Type: String!): [Tvshows]
    getActors: [ActorSchema]
    getActor(name: String!): [ActorSchema]
    getTrailers: [TrailerSchema]
    getTrailer(name: String!): [TrailerSchema]
    getCollections: [CollectionsSchema]
    getCollection(name: String!): [CollectionsSchema]
    getOtts: [OttSchema]
    getOtt(name: String!): [OttSchema]
    getSeason(seasonId: String!) : [Seasons]
  }
  type Mutation {
    #Seasons
    addSeason(
      seasonId: String!
      name: String!
      season: String!
      seasonStart: String!
      seasonEnd: String!
      episodes: [watchOnSchemaSeasonInput]!
    ):Seasons
    updateSeason(
      seasonId: String!
      changedName: String!
      name: String!
      season: String!
      seasonStart: String!
      seasonEnd: String!
      episodes: [watchOnSchemaSeasonInput]!
    ):Seasons 
    deleteSeason(seasonId: String!): Seasons
    # movie
    addMovie(
      name: String!
      rating: [ratingSchemaInput]
      storyline: String!
      casts: [CastSchemaInput]
      movieInfo: [movieInfoSchemaInput]
      posters: [postersSchemaInput]
      rectanglePosters: [RectanglePostersSchemaInput]
      watchOn: [watchOnSchemaInput]
      availLanguages: [availLanguagesSchemaInput]
    ): Movie
    updateMovie(
      name: String!
      changedName: String!
      storyline: String!
      rating: [ratingSchemaInput]
      casts: [CastSchemaInput]
      movieInfo: [movieInfoSchemaInput]
      posters: [postersSchemaInput]
      rectanglePosters: [RectanglePostersSchemaInput]
      watchOn: [watchOnSchemaInput]
      availLanguages: [availLanguagesSchemaInput]
    ): Movie
    deleteMovie(name: String!): Movie
    # tvshows
    addTvshow(
      name: String!
      Type: String!
      rating: [ratingSchemaTvshowInput]
      storyline: String!
      casts: [castSchemaTvshowInputs]
      tvshowInfo: [tvshowInfoSchemaInput]
      posters: [postersSchemaTvshowInput]
      rectanglePosters: [RectanglePostersSchemaTvshowInput]
      watchOn: [watchOnSchemaTvshowInput]
      availLanguages: [availLanguagesSchemaTvshowInput]
    ): Tvshows
    updateTvshow(
      name: String!
      Type: String!
      changedName: String!
      storyline: String!
      rating: [ratingSchemaTvshowInput]
      casts: [castSchemaTvshowInputs]
      tvshowInfo: [tvshowInfoSchemaInput]
      posters: [postersSchemaTvshowInput]
      rectanglePosters: [RectanglePostersSchemaTvshowInput]
      watchOn: [watchOnSchemaTvshowInput]
      availLanguages: [availLanguagesSchemaTvshowInput]
    ): Tvshows
    deleteTvshow(name: String!): Tvshows
    # actors
    addActors(
      name: String!
      description: String!
      image: String!
    ):ActorSchema
    updateActors(
      name: String!
      changedName: String!
      description: String!
      image: String!
    ):ActorSchema
    deleteActors(
      name: String!
    ):ActorSchema

    # trailers
    addTrailers(
      name: String!
      link: String!
      date: String!
    ):TrailerSchema
    updateTrailers(
      name: String!
      changedName: String!
      link: String!
      date: String!
    ):TrailerSchema
    deleteTrailers(
      name: String!
    ):TrailerSchema
    
    
    # Collections
    addCollections(
      name: String!
      image: String!
      type:String!
    ):CollectionsSchema
    updateCollections(
      name: String!
      changedName: String!
      image: String!
      type:String!
    ):CollectionsSchema
    deleteCollections(
      name: String!
    ):CollectionsSchema

    # ott
    addOtt(
      name: String!
      image: String!
      perMonth: String!
    ):OttSchema
    updateOtt(
      name: String!
      changedName: String!
      image: String!
      perMonth: String!
    ):OttSchema
    deleteOtt(
      name: String!
    ):OttSchema
  }
`;

// Case-insensitive "contains" match, with user input escaped so it is never treated as a regex.
const contains = (text) =>
  new RegExp(String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

// Mutations change shared demo data, so when ADMIN_TOKEN is set they require
// a matching `Authorization: Bearer <token>` header.
const requireAdmin = (context) => {
  const token = process.env.ADMIN_TOKEN;
  if (token && context.token !== token) {
    throw new AuthenticationError("Mutations require a valid admin token.");
  }
};

// Every collection is keyed by `name` (seasons by `seasonId` + `season`), and
// update mutations pass the new name as `changedName`.
const crud = (Model, fields) => ({
  add: async (parent, args, context) => {
    requireAdmin(context);
    return Model.create(pick(args, fields));
  },
  update: async (parent, args, context) => {
    requireAdmin(context);
    const doc = await Model.findOneAndUpdate(
      { name: args.name },
      { $set: { ...pick(args, fields), name: args.changedName } },
      { new: true }
    );
    if (!doc) throw new UserInputError(`No ${Model.modelName} named "${args.name}".`);
    return doc;
  },
  remove: async (parent, args, context) => {
    requireAdmin(context);
    const doc = await Model.findOneAndDelete({ name: args.name });
    if (!doc) throw new UserInputError(`No ${Model.modelName} named "${args.name}".`);
    return doc;
  },
});

const pick = (args, fields) =>
  fields.reduce((out, f) => (args[f] === undefined ? out : { ...out, [f]: args[f] }), {});

const movies = crud(Movie, ["name", "storyline", "rating", "casts", "movieInfo", "posters", "rectanglePosters", "watchOn", "availLanguages"]);
const tvshows = crud(TVShow, ["name", "Type", "storyline", "rating", "casts", "tvshowInfo", "posters", "rectanglePosters", "watchOn", "availLanguages"]);
const actors = crud(Actor, ["name", "description", "image"]);
const trailers = crud(Trailer, ["name", "link", "date"]);
const collections = crud(Collection, ["name", "image", "type"]);
const otts = crud(Ott, ["name", "image", "perMonth"]);
const seasonFields = ["seasonId", "name", "season", "seasonStart", "seasonEnd", "episodes"];

const resolvers = {
  Owner: {
    __resolveType: (obj) => (obj.Type ? "Tvshows" : "Movie"),
  },
  Query: {
    getMovies: () => Movie.find({}),
    getMovie: (parent, args) => Movie.find({ name: args.name }),
    // Matches title, genre or cast member.
    searchMovie: (parent, args) =>
      Movie.find({
        $or: [
          { name: contains(args.name) },
          { "movieInfo.genre.genre": contains(args.name) },
          { "casts.castName": contains(args.name) },
        ],
      }),
    // Uses an Atlas Search index when one exists; falls back to a plain regex
    // match on a local or in-memory MongoDB.
    searchMovieautoComplete: async (parent, args) => {
      try {
        return await Movie.aggregate([
          {
            $search: {
              autocomplete: {
                query: `${args.name}`,
                path: "name",
                fuzzy: { maxEdits: 2, prefixLength: 3 },
              },
            },
          },
        ]);
      } catch (err) {
        return Movie.find({ name: contains(args.name) });
      }
    },
    searchTvshows: (parent, args) =>
      TVShow.find({
        $or: [
          { name: contains(args.name) },
          { "tvshowInfo.genre.genre": contains(args.name) },
          { "casts.castName": contains(args.name) },
        ],
      }),
    searchActorMovie: (parent, args) => Movie.find({ "casts.castName": args.casts }),
    searchActorTvshows: (parent, args) => TVShow.find({ "casts.castName": args.casts }),
    getTVshow1: (parent, args) => TVShow.find({ Type: args.Type }),
    getTVshows: () => TVShow.find({}),
    getTVshow: (parent, args) => TVShow.find({ name: args.name }),
    getTrailers: () => Trailer.find({}),
    getTrailer: (parent, args) => Trailer.find({ name: args.name }),
    getActors: () => Actor.find({}),
    getActor: (parent, args) => Actor.find({ name: args.name }),
    getCollections: () => Collection.find({}),
    getCollection: (parent, args) => Collection.find({ name: args.name }),
    getOtts: () => Ott.find({}),
    getOtt: (parent, args) => Ott.find({ name: args.name }),
    getSeason: (parent, args) => Season.find({ seasonId: args.seasonId }).sort({ season: 1 }),
  },
  Mutation: {
    addSeason: async (parent, args, context) => {
      requireAdmin(context);
      return Season.create(pick(args, seasonFields));
    },
    // A show has one document per season, so seasons are matched by seasonId + season.
    updateSeason: async (parent, args, context) => {
      requireAdmin(context);
      const doc = await Season.findOneAndUpdate(
        { seasonId: args.seasonId, season: args.season },
        { $set: { ...pick(args, seasonFields), name: args.changedName } },
        { new: true }
      );
      if (!doc) throw new UserInputError(`No ${args.season} for show ${args.seasonId}.`);
      return doc;
    },
    deleteSeason: async (parent, args, context) => {
      requireAdmin(context);
      const doc = await Season.findOneAndDelete({ seasonId: args.seasonId });
      if (!doc) throw new UserInputError(`No season with seasonId ${args.seasonId}.`);
      return doc;
    },

    addMovie: movies.add,
    updateMovie: movies.update,
    deleteMovie: movies.remove,

    addTvshow: tvshows.add,
    updateTvshow: tvshows.update,
    deleteTvshow: tvshows.remove,

    addActors: actors.add,
    updateActors: actors.update,
    deleteActors: actors.remove,

    addTrailers: trailers.add,
    updateTrailers: trailers.update,
    deleteTrailers: trailers.remove,

    addCollections: collections.add,
    updateCollections: collections.update,
    deleteCollections: collections.remove,

    addOtt: otts.add,
    updateOtt: otts.update,
    deleteOtt: otts.remove,
  },
};

module.exports = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});
