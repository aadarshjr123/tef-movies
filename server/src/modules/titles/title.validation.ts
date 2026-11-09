import { z } from "zod";

/** Absolute http(s) URL, or a site-relative path such as "/images/logo.svg". */
export const urlOrPath = z.string().trim().refine((value) => /^https?:\/\//.test(value) || value.startsWith("/"), {
  message: "must be an http(s) URL or a path starting with /",
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)");
const name = z.string().trim().min(1).max(200);
const names = z.array(name).max(50);

const titleInputBase = z.object({
  name,
  originalName: name.nullable().default(null),
  overview: z.string().trim().min(1).max(5000),
  posterUrl: urlOrPath.nullable().default(null),
  backdropUrl: urlOrPath.nullable().default(null),
  releaseDate: isoDate,
  certification: z.string().trim().max(20).nullable().default(null),
  genres: names.default([]),
  collections: names.default([]),
  languages: names.default([]),
  ratings: z
    .object({
      imdb: z.number().min(0).max(10).nullable().default(null),
      rottenTomatoes: z.number().int().min(0).max(100).nullable().default(null),
    })
    .default({}),
  cast: z.array(z.object({ name, character: z.string().trim().max(200).nullable().default(null) })).max(200).default([]),
  trailers: z
    .array(z.object({ name, youtubeId: z.string().regex(/^[\w-]{11}$/, "must be an 11-character YouTube video id") }))
    .max(50)
    .default([]),
  watchOptions: z
    .array(
      z.object({
        platform: name,
        type: z.enum(["SUBSCRIPTION", "FREE", "RENT", "BUY"]),
        url: z.string().url(),
      }),
    )
    .max(20)
    .default([]),
});

export const movieInputSchema = titleInputBase.extend({
  runtimeMinutes: z.number().int().positive().max(1000).nullable().default(null),
  directors: names.default([]),
});

export const tvShowInputSchema = titleInputBase.extend({
  creators: names.default([]),
  status: z.string().trim().max(50).nullable().default(null),
  seasonCount: z.number().int().min(0).max(100).default(0),
});

export const seasonInputSchema = z.object({
  number: z.number().int().min(0).max(100),
  startDate: isoDate.nullable().default(null),
  endDate: isoDate.nullable().default(null),
  episodes: z
    .array(
      z.object({
        number: z.number().int().positive(),
        name,
        overview: z.string().trim().max(5000).nullable().default(null),
        runtimeMinutes: z.number().int().positive().max(1000).nullable().default(null),
      }),
    )
    .max(500)
    .default([]),
});
