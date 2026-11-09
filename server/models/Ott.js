const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ottSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    perMonth: {
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

let OttDetails = mongoose.model("Ott", ottSchema);
module.exports = { OttDetails, ottSchema };



