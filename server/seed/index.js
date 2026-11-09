const mongoose = require("mongoose");

const Movie = require("../models/movie").Movies;
const TVShow = require("../models/tvshows").TVShows;
const Season = require("../models/seasons").Seasons;
const Actor = require("../models/Actors").Actors;
const Collection = require("../models/Collections").Collections;
const Ott = require("../models/Ott").OttDetails;
const Trailer = require("../models/trailers").TrailerDetails;
const data = require("./data.json");

// Replaces every collection with the sample data in data.json.
async function seed() {
  await Promise.all(
    [Movie, TVShow, Season, Actor, Collection, Ott, Trailer].map((Model) =>
      Model.deleteMany({})
    )
  );

  await Movie.insertMany(data.movies);

  // The client looks seasons up by the show's id, so shows are inserted first
  // and each season gets `seasonId` set to its show's _id.
  for (const { seasons, ...show } of data.tvshows) {
    const doc = await TVShow.create(show);
    await Season.insertMany(
      seasons.map((season) => ({ ...season, seasonId: doc.id }))
    );
  }

  await Actor.insertMany(data.actors);
  await Collection.insertMany(data.collections);
  await Ott.insertMany(data.otts);
  await Trailer.insertMany(data.trailers);

  console.log(
    `Seeded ${data.movies.length} movies, ${data.tvshows.length} TV shows, ` +
      `${data.actors.length} people, ${data.otts.length} OTT platforms.`
  );
}

async function seedIfEmpty() {
  if ((await Movie.estimatedDocumentCount()) === 0) {
    await seed();
  }
}

module.exports = { seed, seedIfEmpty };

// `npm run seed`: reset the database at MONGODB_URI to the sample data.
if (require.main === module) {
  require("dotenv").config();
  if (!process.env.MONGODB_URI) {
    console.error("Set MONGODB_URI (in server/.env) to the database you want to seed.");
    process.exit(1);
  }
  mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(seed)
    .then(() => mongoose.disconnect())
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
