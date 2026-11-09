const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trailerSchema = new Schema(
  {
    name: {
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
    },
  },
  {
    timestamps: true
  }
);

let TrailerDetails = mongoose.model("Trailer", trailerSchema);
module.exports = { TrailerDetails, trailerSchema };



