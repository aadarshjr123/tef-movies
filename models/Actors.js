const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const actorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

let Actors = mongoose.model("Actors", actorSchema);
module.exports = { Actors, actorSchema };
