const { gql, makeExecutableSchema } = require("apollo-server-express");
const { Seasons } = require("./models/seasons");

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

const resolvers = {
  Query: {
    getMovies: (parent, args) => {
      return Movie.find({});
    },
    getMovie: (parent, args) => {
      return Movie.find({name: args.name});
    },
    searchMovie: (parent, args) => {
      return Movie.find({'movieInfo.genre.genre': args.name});
                    // .then((data) => {
                    //   // console.log(data.length);
                    //   // console.log(data);
                    //   let searchData = [];
                    //   let tcshows = TVShow.find({ 'tvshowInfo.genre.genre': args.name});
                    //   // console.log(tcshows);
                    //   // console.log("tcshows",tcshows.length);
                    //   if(data.length <=0 ||data.length === undefined) {
                    //     searchData.push(tcshows);
                    //     // console.log("tvshows");
                    //     // console.log(searchData);
                    //   } else if(tcshows.length <=0 || tcshows.length === undefined) {
                    //     // console.log("movies");
                    //     searchData.push(data);
                    //   }
                    //   else {
                    //     // let tcshows = TVShow.find({ 'tvshowInfo.genre.genre': args.name});
                    //     searchData.push(tcshows);
                    //     searchData.push(data);
                    //     // console.log("both")
                    //     // console.log(searchData)
                    //   }

                    //   console.log(searchData);
                    //   return searchData;
                    // });
    },
    searchMovieautoComplete: (parent, args) => {
        return Movie.aggregate([
          {
              "$search": {
                  "autocomplete": {
                      "query": `${args.name}`,
                      "path": "name",
                      "fuzzy": {
                          "maxEdits": 2,
                          "prefixLength": 3
                      }
                  }
              }
          }
      ])
    },
    searchTvshows: (parent, args) => {
      return TVShow.find({'tvshowInfo.genre.genre': args.name});

    },
    searchActorMovie: (parent, args) => {
      return Movie.find({'casts.castName': args.casts});
    },
    searchActorTvshows: (parent, args) => {
      return TVShow.find({'casts.castName': args.casts});

    },
    getTVshow1: (parent, args) => {
      return TVShow.find({ Type: args.Type});
    },
    getTVshows: (parent, args) => {
      return TVShow.find({});
    },
    getTVshow: (parent, args) => {
      return TVShow.find({name:args.name});
    },
    getTrailers: (parent, args) => {
      return Trailer.find({});
    },
    getTrailer: (parent, args) => {
      return Trailer.find({name:args.name});
    },
    getActors: (parent, args) => {
      return Actor.find({});
    },
    getActor: (parent, args) => {
      return Actor.find({name:args.name});
    },
    // getCollections: [CollectionsSchema]
    // getCollection(name: String!): [CollectionsSchema]
    getCollections: (parent, args) => {
      return Collection.find({});
    },
    getCollection: (parent, args) => {
      return Collection.find({name:args.name});
    },

    getOtts: (parent, args) => {
      return Ott.find({});
    },
    getOtt: (parent, args) => {
      return Ott.find({name:args.name});
    },
    getSeason: (parent, args) => {
      return Season.find({seasonId:args.seasonId});
    }
    // getSeason(name: String!) : [Seasons]
  },
  Mutation: {

    // addSeason(
    //   seasonId: String!
    //   name: String!
    //   season: String!
    //   seasonStart: String!
    //   seasonEnd: String!
    //   episodes: [watchOnSchemaSeasonInput]!
    // ):Seasons

    //Season
    addSeason:async (parent, args) => {
      let newMovie = new Season({
        seasonId: args.seasonId,
        name: args.name,
        season: args.season,
        seasonStart: args.seasonStart,
        seasonEnd: args.seasonEnd,
        episodes: args.episodes,
      });

      let somes;

      await Season.findOne({ name: args.name }).then(
        (data) => {
          // console.log(data);
          // if (data === null) {
            console.log(newMovie);
            somes = newMovie.save();
            return somes;
          // } else {
          //   console.log("The Season name is already in your DB.if you need to update you can use update query");
          
          //   let names = {name : "The Season name is already in your DB.if you need to update you can use update query"}
          //   somes = names;

          //   return somes;
          //   // console.log(sss);
          // }
        }
      );
      // console.log(DuplicateMovieName.schema);
      // if()
      return somes;
    },
    updateSeason: (parent, args) => {
      // console.log(args); 
      if (!args.name) return "No movies";
      let some = Season.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            seasonId: args.seasonId,
        name: args.changedName,
        season: args.season,
        seasonStart: args.seasonStart,
        seasonEnd: args.seasonEnd,
        episodes: args.episodes,
          },
        },
        { new: true },
        (err, Season) => {
          if (err) {
            console.log("Something went wrong when updating the Season");
          } else {
            // console.log("199",Movie);
            return Season;
          }
        }
      );

      // console.log("205",some);
      console.log(some.name);
      return some;
    },
    deleteMovie: async (parent, args) => {
      // console.log(args);
      let some = args;
      let sss = '';
      if (!args.name) return "No Seasons";

      var myquery = { name: args.name };

      await Season.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        if(obj.n === 1) {
          console.log("1 document deleted");
        }  else {
          // console.log("No data to delete");
          let names = {name : "No data to delete"}
          some = names;
          // console.log(sss);
          return some;
        }
      })
    
      await console.log(some);
      return some;
      // .then(() => {
      //  return args
      // });
    },
    // Movies
    addMovie:async (parent, args) => {
      let newMovie = new Movie({
        name: args.name,
        storyline: args.storyline,
        rating: args.rating,
        casts: args.casts,
        movieInfo: args.movieInfo,
        posters: args.posters,
        rectanglePosters: args.rectanglePosters,
        watchOn: args.watchOn,
        availLanguages: args.availLanguages,
      });

      let somes;

      await Movie.findOne({ name: args.name }).then(
        (data) => {
          // console.log(data);
          if (data === null) {
            console.log(newMovie);
            somes = newMovie.save();
            return somes;
          } else {
            console.log("The movie name is already in your DB.if you need to update u can use update query");
          
            let names = {name : "The movie name is already in your DB.if you need to update you can use update query"}
            somes = names;

            return somes;
            // console.log(sss);
          }
        }
      );
      // console.log(DuplicateMovieName.schema);
      // if()
      return somes;
    },
    updateMovie: (parent, args) => {
      // console.log(args); 
      if (!args.name) return "No movies";
      let some = Movie.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            name: args.changedName,
            storyline: args.storyline,
            rating: args.rating,
            casts: args.casts,
            movieInfo: args.movieInfo,
            posters: args.posters,
            rectanglePosters: args.rectanglePosters,
            watchOn: args.watchOn,
            availLanguages: args.availLanguages,
          },
        },
        { new: true },
        (err, Movie) => {
          if (err) {
            console.log("Something went wrong when updating the movie");
          } else {
            // console.log("199",Movie);
            return Movie;
          }
        }
      );

      // console.log("205",some);
      console.log(some.name);
      return some;
    },
    deleteMovie: async (parent, args) => {
      // console.log(args);
      let some = args;
      let sss = '';
      if (!args.name) return "No movies";

      var myquery = { name: args.name };

      await Movie.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        if(obj.n === 1) {
          console.log("1 document deleted");
        }  else {
          // console.log("No data to delete");
          let names = {name : "No data to delete"}
          some = names;
          // console.log(sss);
          return some;
        }
      })
    
      await console.log(some);
      return some;
      // .then(() => {
      //  return args
      // });
    },

    // Tvshows
    addTvshow:async (parent, args) => {
      let newMovie = new TVShow({
        name: args.name,
        Type: args.Type,
        storyline: args.storyline,
        rating: args.rating,
        casts: args.casts,
        tvshowInfo: args.tvshowInfo,
        posters: args.posters,
        rectanglePosters: args.rectanglePosters,
        watchOn: args.watchOn,
        availLanguages: args.availLanguages,
      });

      let somes;

      await TVShow.findOne({ name: args.name }).then(
        (data) => {
          // console.log(data);
          if (data === null) {
            console.log(newMovie);
            somes = newMovie.save();
            return somes;
          } else {
            console.log("The tvshow name is already in your DB.if you need to update u can use update query");
          
            let names = {name : "The tvshow name is already in your DB.if you need to update you can use update query"}
            somes = names;

            return somes;
            // console.log(sss);
          }
        }
      );
      // console.log(DuplicateMovieName.schema);
      // if()
      return somes;
    },

    updateTvshow: (parent, args) => {
      // console.log(args); 
      if (!args.name) return "No Tvshows";
      let some = TVShow.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            name: args.changedName,
            Type: args.Type,
            storyline: args.storyline,
            rating: args.rating,
            casts: args.casts,
            tvshowInfo: args.tvshowInfo,
            posters: args.posters,
            rectanglePosters: args.rectanglePosters,
            watchOn: args.watchOn,
            availLanguages: args.availLanguages,
          },
        },
        { new: true },
        (err, Movie) => {
          if (err) {
            console.log("Something went wrong when updating the movie");
          } else {
            // console.log("199",Movie);
            return Movie;
          }
        }
      );

      // console.log("205",some);
      console.log(some.name);
      return some;
    },
    deleteTvshow: async (parent, args) => {
      // console.log(args);
      let some = args;
      let sss = '';
      if (!args.name) return "No Tvshows";

      var myquery = { name: args.name };

      await TVShow.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        if(obj.n === 1) {
          console.log("1 document deleted");
        }  else {
          // console.log("No data to delete");
          let names = {name : "No data to delete"}
          some = names;
          // console.log(sss);
          return some;
        }
      })
    
      await console.log(some);
      return some;
      // .then(() => {
      //  return args
      // });
    },

    // Actors
    addActors:async (parent, args) => {
      let newActors = new Actor({
        name: args.name,
        description: args.description,
        image: args.image
      });

      let somes;

      await Actor.findOne({ name: args.name }).then(
        (data) => {
          // console.log(data);
          if (data === null) {
            console.log(newActors);
            somes = newActors.save();
            return somes;
          } else {
            console.log("The actor name is already in your DB.if you need to update u can use update query");
          
            let names = {name : "The actor name is already in your DB.if you need to update you can use update query"}
            somes = names;

            return somes;
            // console.log(sss);
          }
        }
      );
      // console.log(DuplicateMovieName.schema);
      // if()
      return somes;
    },


    updateActors: (parent, args) => {
      // console.log(args); 
      // let somee = args.name;
      if (!args.name) return "No actor";
      let some = Actor.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            name: args.changedName,
            description: args.description,
            image: args.image
          },
        },
        { new: true },
        (err, Actor) => {
          if (err) {
            console.log("Something went wrong when updating the Actors");
          } else {
            return Actor;
          }
        }
      );


      // console.log(some);
      return some;
    },

    deleteActors: async (parent, args) => {
      // console.log(args);
      let some = args;
      let sss = '';
      if (!args.name) return "No actors";

      var myquery = { name: args.name };

      await Actor.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        if(obj.n === 1) {
          console.log("1 document deleted");
        }  else {
          // console.log("No data to delete");
          let names = {name : "No data to delete"}
          some = names;
          // console.log(sss);
          return some;
        }
      })
    
      await console.log(some);
      return some;
      // .then(() => {
      //  return args
      // });
    },

    //trailers
    
    addTrailers:async (parent, args) => {
      let newActors = new Trailer({
        name: args.name,
        link: args.link,
        date: args.date
      });

      let somes;

      await Trailer.findOne({ name: args.name }).then(
        (data) => {
          // console.log(data);
          if (data === null) {
            console.log(newActors);
            somes = newActors.save();
            return somes;
          } else {
            console.log("The trailer name is already in your DB.if you need to update u can use update query");
          
            let names = {name : "The trailer name is already in your DB.if you need to update you can use update query"}
            somes = names;

            return somes;
            // console.log(sss);
          }
        }
      );
      // console.log(DuplicateMovieName.schema);
      // if()
      return somes;
    },

    updateTrailers: (parent, args) => {
      // console.log(args); 
      // let somee = args.name;
      if (!args.name) return "No trailer";
      let some = Trailer.findOneAndUpdate(
        {
          name: args.name,
        },
        {
          $set: {
            name: args.changedName,
            link: args.link,
            date: args.date
          },
        },
        { new: true },
        (err, Trailer) => {
          if (err) {
            console.log("Something went wrong when updating the Trailer");
          } else {
            return Trailer;
          }
        }
      );


      // console.log(some);
      return some;
    },

    deleteTrailers: async (parent, args) => {
      // console.log(args);
      let some = args;
      let sss = '';
      if (!args.name) return "No Trailer";

      var myquery = { name: args.name };

      await Trailer.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        if(obj.n === 1) {
          console.log("1 document deleted");
        }  else {
          // console.log("No data to delete");
          let names = {name : "No data to delete"}
          some = names;
          // console.log(sss);
          return some;
        }
      })
    
      await console.log(some);
      return some;
      // .then(() => {
      //  return args
      // });
    },


    //Collection 

    addCollections:async (parent, args) => {
          let newCollections = new Collection({
            name: args.name,
            image: args.image,
            type: args.type,
          });
    
          let somes;
    
          await Collection.findOne({ name: args.name }).then(
            (data) => {
              // console.log(data);
              if (data === null) {
                console.log(newCollections);
                somes = newCollections.save();
                return somes;
              } else {
                console.log("The Collections name is already in your DB.if you need to update you can use update query");
              
                let names = {name : "The Collections name is already in your DB.if you need to update you can use update query"}
                somes = names;
    
                return somes;
                // console.log(sss);
              }
            }
          );
          // console.log(DuplicateMovieName.schema);
          // if()
          return somes;
        },
        updateCollections: (parent, args) => {
          // console.log(args); 
          // let somee = args.name;
          if (!args.name) return "No Collection";
          let some = Collection.findOneAndUpdate(
            {
              name: args.name,
            },
            {
              $set: {
                name: args.changedName,
                image: args.image,
                type: args.type
              },
            },
            { new: true },
            (err, Collection) => {
              if (err) {
                console.log("Something went wrong when updating the Collection");
              } else {
                return Collection;
              }
            }
          );
    
    
          // console.log(some);
          return some;
        },

        deleteCollections: async (parent, args) => {
          // console.log(args);
          let some = args;
          let sss = '';
          if (!args.name) return "No Collection";
    
          var myquery = { name: args.name };
    
          await Collection.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            if(obj.n === 1) {
              console.log("1 document deleted");
            }  else {
              // console.log("No data to delete");
              let names = {name : "No data to delete"}
              some = names;
              // console.log(sss);
              return some;
            }
          })
        
          await console.log(some);
          return some;
          // .then(() => {
          //  return args
          // });
        },

// Ott
addOtt:async (parent, args) => {
  let newOtt = new Ott({
    name: args.name,
    image: args.image,
    perMonth: args.perMonth
  });

  let somes;

  await Ott.findOne({ name: args.name }).then(
    (data) => {
      // console.log(data);
      if (data === null) {
        console.log(newOtt);
        somes = newOtt.save();
        return somes;
      } else {
        console.log("The Ott name is already in your DB.if you need to update u can use update query");
      
        let names = {name : "The Ott name is already in your DB.if you need to update you can use update query"}
        somes = names;

        return somes;
        // console.log(sss);
      }
    }
  );
  // console.log(DuplicateMovieName.schema);
  // if()
  return somes;
},


updateOtt: (parent, args) => {
  // console.log(args); 
  // let somee = args.name;
  if (!args.name) return "No Ott";
  let some = Ott.findOneAndUpdate(
    {
      name: args.name,
    },
    {
      $set: {
        name: args.changedName,
        image: args.image,
        perMonth: args.perMonth

      },
    },
    { new: true },
    (err, Ott) => {
      if (err) {
        console.log("Something went wrong when updating the Ott");
      } else {
        return Ott;
      }
    }
  );


  // console.log(some);
  return some;
},

deleteOtt: async (parent, args) => {
  // console.log(args);
  let some = args;
  let sss = '';
  if (!args.name) return "No Ott";

  var myquery = { name: args.name };

  await Ott.deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    if(obj.n === 1) {
      console.log("1 document deleted");
    }  else {
      // console.log("No data to delete");
      let names = {name : "No data to delete"}
      some = names;
      // console.log(sss);
      return some;
    }
  })

  await console.log(some);
  return some;
  // .then(() => {
  //  return args
  // });
},
  },
};

module.exports = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});
