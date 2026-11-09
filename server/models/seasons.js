const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchOnSchemaSeason = new Schema({
  episodeName: {
    type: String,
    required: true
  },
  episodeDescription: {
    type: String,
    required: true
  } ,
  episodeDuration: {
    type: String,
    required: true
  }  
}, { _id : false })
mongoose.model('watchOnSchemaSeason',watchOnSchemaSeason ,'watchOnSchemaSeason')

const seasonsSchema = new Schema(
  {
    seasonId: {
    type: String,
    required: true
    },
    name: {
      type: String,
      required: true
    },
    season: {
      type: String,
      required: true
    },
    seasonStart: {
      type: String,
      required: true
    },
    seasonEnd: {
      type: String,
      required: true
    },
    episodes: [watchOnSchemaSeason]
  },
  {
    timestamps: true
  }
);

let Seasons = mongoose.model("Seasons", seasonsSchema);
module.exports = { Seasons, seasonsSchema };