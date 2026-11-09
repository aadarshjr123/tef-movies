import { GraphQLError } from "graphql";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { loadEnv } from "../../src/config/env";
import { isAdminToken } from "../../src/graphql/context";
import { AppError, createErrorFormatter } from "../../src/lib/errors";
import { clampLimit, containsText, escapeRegExp } from "../../src/lib/text";
import { buildTitleFilter } from "../../src/modules/titles/title.repository";

describe("loadEnv", () => {
  it("applies defaults and parses CORS_ORIGINS", () => {
    const env = loadEnv({ CORS_ORIGINS: "https://a.com, https://b.com" });

    expect(env).toMatchObject({ NODE_ENV: "development", PORT: 4000, SEED_ON_START: true });
    expect(env.CORS_ORIGINS).toEqual(["https://a.com", "https://b.com"]);
  });

  it("requires MONGODB_URI and ADMIN_TOKEN in production", () => {
    expect(() => loadEnv({ NODE_ENV: "production" })).toThrow(/MONGODB_URI.*\n.*ADMIN_TOKEN/);
  });

  it("rejects short admin tokens and non-Mongo URIs", () => {
    expect(() => loadEnv({ ADMIN_TOKEN: "short" })).toThrow(/ADMIN_TOKEN/);
    expect(() => loadEnv({ MONGODB_URI: "postgres://x" })).toThrow(/MONGODB_URI/);
  });
});

describe("text helpers", () => {
  it("escapes regex metacharacters so input is matched literally", () => {
    expect(escapeRegExp("a.b*(c)")).toBe("a\\.b\\*\\(c\\)");
    expect(containsText("spider-man (2018)").test("Spider-Man (2018) remastered")).toBe(true);
    expect(containsText(".*").test("anything")).toBe(false);
  });

  it("clamps limits", () => {
    expect(clampLimit(undefined, 20)).toBe(20);
    expect(clampLimit(0, 20)).toBe(1);
    expect(clampLimit(1000, 20)).toBe(100);
    expect(clampLimit(5.7, 20)).toBe(5);
  });
});

describe("isAdminToken", () => {
  const token = "a-very-long-admin-token";

  it("accepts only the exact bearer token", () => {
    expect(isAdminToken(`Bearer ${token}`, token)).toBe(true);
    expect(isAdminToken(`Bearer ${token}x`, token)).toBe(false);
    expect(isAdminToken(token, token)).toBe(false);
    expect(isAdminToken(undefined, token)).toBe(false);
  });

  it("denies everything when no admin token is configured", () => {
    expect(isAdminToken("Bearer anything", undefined)).toBe(false);
  });
});

describe("createErrorFormatter", () => {
  const formatted = { message: "boom" };

  it("exposes AppError messages and codes", () => {
    const result = createErrorFormatter(true)(formatted, new AppError("Movie not found", "NOT_FOUND"));

    expect(result).toMatchObject({ message: "Movie not found", extensions: { code: "NOT_FOUND" } });
  });

  it("turns validation errors into BAD_USER_INPUT with issue paths", () => {
    const error = z.object({ name: z.string() }).safeParse({}).error;

    const result = createErrorFormatter(true)(formatted, error);

    expect(result.extensions).toMatchObject({ code: "BAD_USER_INPUT", issues: [{ path: "name" }] });
  });

  it("masks unexpected errors only in production", () => {
    const unexpected = new GraphQLError("db password is hunter2");

    expect(createErrorFormatter(true)({ message: "db password is hunter2" }, unexpected).message).toBe("Internal server error.");
    expect(createErrorFormatter(false)({ message: "db password is hunter2" }, unexpected).message).toBe("db password is hunter2");
  });
});

describe("buildTitleFilter", () => {
  it("combines kind, genre and platform filters", () => {
    const query = buildTitleFilter("MOVIE", { genre: "Drama", platform: "Netflix", watchType: "SUBSCRIPTION" });

    expect(query.kind).toBe("MOVIE");
    expect((query.genres as RegExp).test("drama")).toBe(true);
    expect(query.watchOptions).toMatchObject({ $elemMatch: { type: "SUBSCRIPTION" } });
  });

  it("matches a person as cast, director or creator", () => {
    const query = buildTitleFilter(undefined, { person: "Christopher Nolan" });

    expect(query.$or).toHaveLength(3);
    expect(query.kind).toBeUndefined();
  });
});
