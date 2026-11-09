import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp, type App } from "../../src/app";
import { loadEnv } from "../../src/config/env";
import { createServices } from "../../src/container";
import { createLogger } from "../../src/lib/logger";
import { seedDatabase } from "../../src/seed/seed";

const ADMIN_TOKEN = "integration-test-admin-token";

let mongo: MongoMemoryServer;
let server: App;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri("tef-test"));
  const env = loadEnv({ NODE_ENV: "test", ADMIN_TOKEN });
  const logger = createLogger(env);
  await seedDatabase(logger);
  server = createApp({ env, logger, services: createServices() });
  await server.start();
});

afterAll(async () => {
  await server.stop();
  await mongoose.disconnect();
  await mongo.stop();
});

async function gql<T = Record<string, unknown>>(query: string, variables?: object, token?: string) {
  const req = request(server.app).post("/graphql").set("content-type", "application/json");
  if (token) req.set("authorization", `Bearer ${token}`);
  const res = await req.send({ query, variables });
  return res.body as { data?: T; errors?: { message: string; extensions: { code: string; issues?: unknown[] } }[] };
}

describe("HTTP", () => {
  it("reports health", async () => {
    const res = await request(server.app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("sets security headers", async () => {
    const res = await request(server.app).get("/health");
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });
});

describe("queries", () => {
  it("lists movies newest first, with nested credits and platforms", async () => {
    const { data, errors } = await gql<{
      movies: {
        name: string;
        year: number;
        directors: { person: { imageUrl: string } | null }[];
        watchOptions: { platform: { logoUrl: string | null } }[];
      }[];
    }>(`{ movies(limit: 3) { name year directors { person { imageUrl } } watchOptions { platform { logoUrl } } } }`);

    expect(errors).toBeUndefined();
    expect(data!.movies.map((m) => m.name)).toEqual(["Dune: Part Two", "Oppenheimer", "Top Gun: Maverick"]);
    expect(data!.movies[0]!.directors[0]!.person?.imageUrl).toMatch(/^https:/);
    expect(data!.movies[0]!.watchOptions[0]!.platform.logoUrl).toMatch(/^https:/);
  });

  it("filters by platform and watch type", async () => {
    const { data } = await gql<{ movies: { watchOptions: { type: string; platform: { name: string } }[] }[] }>(
      `{ movies(filter: { platform: "Netflix", watchType: SUBSCRIPTION }, limit: 50) { watchOptions { type platform { name } } } }`,
    );

    expect(data!.movies.length).toBeGreaterThan(0);
    for (const movie of data!.movies) {
      expect(movie.watchOptions).toContainEqual({ type: "SUBSCRIPTION", platform: { name: "Netflix" } });
    }
  });

  it("sorts by IMDb rating", async () => {
    const { data } = await gql<{ tvShows: { ratings: { imdb: number } }[] }>(
      `{ tvShows(sort: IMDB_RATING_DESC, limit: 5) { ratings { imdb } } }`,
    );
    const ratings = data!.tvShows.map((s) => s.ratings.imdb);

    expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
  });

  it("fetches a TV show by id with its seasons and similar shows", async () => {
    const list = await gql<{ tvShows: { id: string }[] }>(`{ tvShows(filter: { person: "Bryan Cranston" }) { id } }`);
    const id = list.data!.tvShows[0]!.id;

    const { data } = await gql<{
      tvShow: { name: string; seasons: { number: number; episodes: unknown[] }[]; similar: { __typename: string }[] };
    }>(
      `query($id: ID!) { tvShow(id: $id) { name seasons { number episodes { name } } similar(limit: 3) { __typename } } }`,
      { id },
    );

    expect(data!.tvShow.name).toBe("Breaking Bad");
    expect(data!.tvShow.seasons.map((s) => s.number)).toEqual([1, 2, 3, 4, 5]);
    expect(data!.tvShow.seasons[0]!.episodes).toHaveLength(7);
    expect(data!.tvShow.similar.every((t) => t.__typename === "TvShow")).toBe(true);
  });

  it("returns null for unknown or malformed ids", async () => {
    const { data, errors } = await gql(
      `{ a: movie(id: "000000000000000000000000") { name } b: movie(id: "not-an-id") { name } }`,
    );

    expect(errors).toBeUndefined();
    expect(data).toEqual({ a: null, b: null });
  });

  it("searches across movies and TV shows", async () => {
    const { data } = await gql<{ search: { __typename: string; name: string }[] }>(
      `{ search(query: "crime") { __typename name } }`,
    );
    const types = new Set(data!.search.map((t) => t.__typename));

    expect(types).toEqual(new Set(["Movie", "TvShow"]));
  });

  it("treats search input literally", async () => {
    const { data } = await gql<{ search: unknown[] }>(`{ search(query: ".*") { name } }`);
    expect(data!.search).toEqual([]);
  });

  it("returns BAD_USER_INPUT for a too-short search", async () => {
    const { errors } = await gql(`{ search(query: "a") { name } }`);
    expect(errors![0]!.extensions.code).toBe("BAD_USER_INPUT");
  });

  it("lists a person's movies and TV shows", async () => {
    const { data } = await gql<{ person: { movies: { name: string }[]; tvShows: unknown[] } }>(
      `{ person(name: "christopher nolan") { movies { name } tvShows { name } } }`,
    );

    expect(data!.person.movies.map((m) => m.name)).toContain("Inception");
    expect(data!.person.tvShows).toEqual([]);
  });

  it("rejects queries nested deeper than the limit", async () => {
    const { errors } = await gql(
      `{ movies { cast { person { movies { cast { person { movies { cast { person { name } } } } } } } } } }`,
    );
    expect(errors![0]!.message).toMatch(/exceeds maximum operation depth/);
  });

  it("batches person lookups into a single database query (no N+1)", async () => {
    const queries: string[] = [];
    mongoose.set("debug", (collection: string) => {
      queries.push(collection);
    });
    try {
      await gql(`{ movies(limit: 10) { cast { person { name } } directors { person { name } } } }`);
    } finally {
      mongoose.set("debug", false);
    }

    expect(queries.filter((collection) => collection === "people")).toHaveLength(1);
  });
});

describe("mutations", () => {
  const input = { name: "Test Movie", overview: "A test.", releaseDate: "2030-01-01", genres: ["Drama"] };
  const create = `mutation($input: MovieInput!) { createMovie(input: $input) { id name genres } }`;

  it("requires the admin token", async () => {
    const { errors } = await gql(create, { input });
    expect(errors![0]!.extensions.code).toBe("UNAUTHENTICATED");

    const wrongToken = await gql(create, { input }, "wrong-token-of-some-length");
    expect(wrongToken.errors![0]!.extensions.code).toBe("UNAUTHENTICATED");
  });

  it("validates input", async () => {
    const { errors } = await gql(create, { input: { ...input, releaseDate: "January 2030" } }, ADMIN_TOKEN);

    expect(errors![0]!.extensions.code).toBe("BAD_USER_INPUT");
    expect(errors![0]!.extensions.issues).toContainEqual(expect.objectContaining({ path: "releaseDate" }));
  });

  it("creates, updates and deletes a movie", async () => {
    const created = await gql<{ createMovie: { id: string } }>(create, { input }, ADMIN_TOKEN);
    const id = created.data!.createMovie.id;

    const newest = await gql<{ movies: { name: string }[] }>(`{ movies(limit: 1) { name } }`);
    expect(newest.data!.movies[0]!.name).toBe("Test Movie");

    const updated = await gql<{ updateMovie: { name: string } }>(
      `mutation($id: ID!, $input: MovieInput!) { updateMovie(id: $id, input: $input) { name } }`,
      { id, input: { ...input, name: "Renamed" } },
      ADMIN_TOKEN,
    );
    expect(updated.data!.updateMovie.name).toBe("Renamed");

    await gql(`mutation($id: ID!) { deleteMovie(id: $id) }`, { id }, ADMIN_TOKEN);
    const after = await gql<{ movie: null }>(`query($id: ID!) { movie(id: $id) { id } }`, { id });
    expect(after.data!.movie).toBeNull();
  });

  it("returns NOT_FOUND when deleting a missing title", async () => {
    const { errors } = await gql(`mutation { deleteTvShow(id: "000000000000000000000000") }`, {}, ADMIN_TOKEN);
    expect(errors![0]!.extensions.code).toBe("NOT_FOUND");
  });

  it("upserts a platform", async () => {
    await gql(
      `mutation { upsertPlatform(input: { name: "Mubi", pricing: "Subscription" }) { name } }`,
      {},
      ADMIN_TOKEN,
    );
    const { data } = await gql<{ platforms: { name: string }[] }>(`{ platforms { name } }`);

    expect(data!.platforms.map((p) => p.name)).toContain("Mubi");
  });
});
