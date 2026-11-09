const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

let Collections = mongoose.model("Collections", CollectionsSchema);
module.exports = { Collections, CollectionsSchema };
