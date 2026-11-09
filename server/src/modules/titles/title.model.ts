import mongoose, { Schema, type InferSchemaType } from "mongoose";

const castSchema = new Schema({ name: { type: String, required: true }, character: String }, { _id: false });
const trailerSchema = new Schema(
  { name: { type: String, required: true }, youtubeId: { type: String, required: true } },
  { _id: false },
);
const watchOptionSchema = new Schema(
  {
    platform: { type: String, required: true },
    type: { type: String, enum: ["SUBSCRIPTION", "FREE", "RENT", "BUY"], required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

/**
 * Movies and TV shows share one collection, so search, person and platform
 * queries run against a single index set. `kind` tells them apart; fields that
 * only apply to one kind are optional.
 */
const titleSchema = new Schema(
  {
    kind: { type: String, enum: ["MOVIE", "TV_SHOW"], required: true },
    name: { type: String, required: true, trim: true },
    originalName: String,
    overview: { type: String, required: true },
    posterUrl: String,
    backdropUrl: String,
    releaseDate: { type: String, required: true },
    certification: String,
    genres: { type: [String], default: [] },
    collections: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    ratings: {
      imdb: { type: Number, default: null },
      rottenTomatoes: { type: Number, default: null },
    },
    cast: { type: [castSchema], default: [] },
    trailers: { type: [trailerSchema], default: [] },
    watchOptions: { type: [watchOptionSchema], default: [] },
    // Movie only
    runtimeMinutes: Number,
    directors: { type: [String], default: undefined },
    // TV show only
    creators: { type: [String], default: undefined },
    status: String,
    seasonCount: Number,
  },
  { timestamps: true },
);

// Indexes back the list, filter and sort combinations the API exposes.
titleSchema.index({ kind: 1, releaseDate: -1 });
titleSchema.index({ kind: 1, "ratings.imdb": -1 });
titleSchema.index({ genres: 1 });
titleSchema.index({ collections: 1 });
titleSchema.index({ "cast.name": 1 });
titleSchema.index({ "watchOptions.platform": 1, "watchOptions.type": 1 });
titleSchema.index({ name: 1 });

export type TitleDocument = InferSchemaType<typeof titleSchema> & { _id: mongoose.Types.ObjectId };
export const TitleModel = mongoose.model("Title", titleSchema);

const episodeSchema = new Schema(
  {
    number: { type: Number, required: true },
    name: { type: String, required: true },
    overview: String,
    runtimeMinutes: Number,
  },
  { _id: false },
);

/** Seasons live in their own collection so title lists stay small. */
const seasonSchema = new Schema(
  {
    titleId: { type: Schema.Types.ObjectId, ref: "Title", required: true },
    number: { type: Number, required: true },
    startDate: String,
    endDate: String,
    episodes: { type: [episodeSchema], default: [] },
  },
  { timestamps: true },
);
seasonSchema.index({ titleId: 1, number: 1 }, { unique: true });

export type SeasonDocument = InferSchemaType<typeof seasonSchema> & { _id: mongoose.Types.ObjectId };
export const SeasonModel = mongoose.model("Season", seasonSchema);
