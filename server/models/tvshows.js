const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const castSchemaTvshow = new Schema({
  castName: {
    type: String,
    required: true
}  ,
CharacterName: {
  type: String,
  required: true
}  
}, { _id : false })

mongoose.model('castSchemaTvshow',castSchemaTvshow ,'castSchemaTvshow')

const ratingSchemaTvshow = new Schema({
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

mongoose.model('ratingSchemaTvshow',ratingSchemaTvshow ,'ratingSchemaTvshow')

const postersSchemaTvshow = new Schema({
  posters: {
    type: String,
    required: true
  }  
}, { _id : false })


const RectanglePostersSchemaTvshow = new Schema({
  rectanglePosters: {
    type: String,
    required: true
  }  
}, { _id : false })
mongoose.model('RectanglePostersSchemaTvshow',RectanglePostersSchemaTvshow ,'RectanglePostersSchemaTvshow')

const watchOnSchemaTvshow = new Schema({
  watchOnLink: {
    type: String,
    required: true
  },
  watchOn: {
    type: String,
    required: true
  }  
}, { _id : false })
mongoose.model('watchOnSchemaTvshow',watchOnSchemaTvshow ,'watchOnSchemaTvshow')

const genreSchema = new Schema({
  genre: {
    type: String,
    required: true
  }  
}, { _id : false })

const creatorSchema = new Schema({
  creator: {
    type: String,
    required: true
  }  
}, { _id : false })

const ratingSchema = new Schema({
  rating: {
    type: String,
    required: true
  }  
}, { _id : false })

const videosTvSchema = new Schema({
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
mongoose.model('videosTvSchema',videosTvSchema ,'videosTvSchema')


const tvshowInfoSchema = new Schema({
  rating: [ratingSchema],
  creator: [creatorSchema],
  writer: {
    type: String,
    required: true
  },
  link: [videosTvSchema],
  releaseDate: {
    type: String,
    required: true
  },
  dateFormat: {
    type: String,
    required: true
  },
  genre : [genreSchema] ,
  originalTitle : {
    type: String,
    required : true
  },
  noOfseasons : {
    type: String,
    required : true
  },
  status : {
    type: String,
    required : true
  } 
}, { _id : false })

mongoose.model('tvshowInfoSchema',tvshowInfoSchema ,'tvshowInfoSchema')

const availLanguagesSchemaTvshow = new Schema({
  languages: {
    type: String,
    required: true
  },
}, { _id : false })

mongoose.model('availLanguagesSchemaTvshow',availLanguagesSchemaTvshow ,'availLanguagesSchemaTvshow')


const tvshowsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: [ratingSchemaTvshow],
    posters: [postersSchemaTvshow],
    rectanglePosters: [RectanglePostersSchemaTvshow],
    watchOn: [watchOnSchemaTvshow],
    casts: [castSchemaTvshow],
    storyline: {
      type: String,
      required: true
    },
    Type: {
      type: String,
      required : true
    } ,
    tvshowInfo: [tvshowInfoSchema],
    availLanguages: [availLanguagesSchemaTvshow]
  },
  {
    timestamps: true
  }
);

let TVShows = mongoose.model("TVShows", tvshowsSchema);
module.exports = { TVShows, tvshowsSchema };

