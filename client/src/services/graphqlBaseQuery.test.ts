import { afterEach, describe, expect, it, vi } from "vitest";
import { graphqlBaseQuery } from "./graphqlBaseQuery";

const baseQuery = graphqlBaseQuery({ url: "https://api.test/graphql" });
const run = () =>
  baseQuery({ document: "query Q { a }", variables: { x: 1 } }, { signal: new AbortController().signal } as never, {});

const mockFetch = (impl: () => Promise<Response>) => vi.spyOn(globalThis, "fetch").mockImplementation(impl);

afterEach(() => vi.restoreAllMocks());

describe("graphqlBaseQuery", () => {
  it("posts the query and variables, returning data", async () => {
    const fetchSpy = mockFetch(async () => Response.json({ data: { a: 1 } }));

    expect(await run()).toEqual({ data: { a: 1 } });
    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://api.test/graphql");
    expect(JSON.parse(init!.body as string)).toEqual({ query: "query Q { a }", variables: { x: 1 } });
  });

  it("surfaces the first GraphQL error with its code", async () => {
    mockFetch(async () =>
      Response.json({ errors: [{ message: "Movie not found", extensions: { code: "NOT_FOUND" } }] }),
    );

    expect(await run()).toEqual({ error: { status: "GRAPHQL_ERROR", message: "Movie not found", code: "NOT_FOUND" } });
  });

  it("reports HTTP errors without a GraphQL body", async () => {
    mockFetch(async () => new Response("Bad gateway", { status: 502 }));

    expect(await run()).toMatchObject({ error: { status: 502 } });
  });

  it("reports network failures", async () => {
    mockFetch(async () => {
      throw new TypeError("Failed to fetch");
    });

    expect(await run()).toMatchObject({ error: { status: "FETCH_ERROR" } });
  });
});
