const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const castSchema = new Schema({
  castName: {
    type: String,
    required: true
}  ,
CharacterName: {
  type: String,
  required: true
}  
}, { _id : false })

mongoose.model('CastSchema',castSchema ,'CastSchema')

const ratingSchema = new Schema({
  imdb: {
    type: String,
    required: true
  } ,
  rottenTomatoes: {
    type: String,
    required: true
  }  ,
  mydramalist: {
    type: String,
    required: true
  }  
}, { _id : false })

mongoose.model('ratingSchema',ratingSchema ,'ratingSchema')

const postersSchema = new Schema({
  posters: {
    type: String,
    required: true
  }  
}, { _id : false })

const genreSchema = new Schema({
  genre: {
    type: String,
    required: true
  }  
}, { _id : false })


const directorSchema = new Schema({
  director: {
    type: String,
    required: true
  }  
}, { _id : false })

const ratingSchema1 = new Schema({
  rating: {
    type: String,
    required: true
  }  
}, { _id : false })


const RectanglePostersSchema = new Schema({
  rectanglePosters: {
    type: String,
    required: true
  }  
}, { _id : false })
mongoose.model('RectanglePostersSchema',RectanglePostersSchema ,'RectanglePostersSchema')

const watchOnSchema = new Schema({
  watchOnLink: {
    type: String,
    required: true
  },
  watchOn: {
    type: String,
    required: true
  }  
}, { _id : false })
mongoose.model('watchOnSchema',watchOnSchema ,'watchOnSchema')

const videosSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }   
}, { _id : false })
mongoose.model('videosSchema',videosSchema ,'videosSchema')


const movieInfoSchema = new Schema({
  rating: [ratingSchema1],
  director: [directorSchema],
  runtime: {
    type: String,
    required: true
  },
  link: [videosSchema],
  releaseDate: {
    type: String,
    required: true
  },
  originalTitle : {
    type: String,
    required : true
  },
  dateFormat: {
    type: String,
    required: true
  },
  genre : [genreSchema]  
}, { _id : false })

mongoose.model('movieInfoSchema',movieInfoSchema ,'movieInfoSchema')

const availLanguagesSchema = new Schema({
  languages: {
    type: String,
    required: true
  },
}, { _id : false })

mongoose.model('availLanguagesSchema',availLanguagesSchema ,'availLanguagesSchema')


const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: [ratingSchema],
    posters: [postersSchema],
    rectanglePosters: [RectanglePostersSchema],
    watchOn: [watchOnSchema],
    casts: [castSchema],
    storyline: {
      type: String,
      required: true
    },
    movieInfo: [movieInfoSchema],
    availLanguages: [availLanguagesSchema],
  },
  {
    timestamps: true
  }
);

let Movies = mongoose.model("Movie", movieSchema);
module.exports = { Movies, movieSchema };
