import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery, type ApiError } from "./graphqlBaseQuery";

export const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:4000/graphql";

/** Delays between attempts; about 70s in total, enough for a sleeping free-tier server to wake. */
const RETRY_DELAYS_MS = [2_000, 4_000, 8_000, 16_000, 20_000, 20_000];

/**
 * Only failures that can fix themselves are retried: no response at all, or a
 * gateway/unavailable status while the server starts. GraphQL errors (bad
 * input, not found) are returned immediately.
 */
export const isTransient = (error: ApiError) =>
  error.status === "FETCH_ERROR" || error.status === 502 || error.status === 503 || error.status === 504;

const baseQueryWithRetry = retry(graphqlBaseQuery({ url: API_URL }), {
  retryCondition: (error, _args, { attempt }) => attempt <= RETRY_DELAYS_MS.length && isTransient(error as ApiError),
  backoff: (attempt) => new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt - 1] ?? 20_000)),
});

/**
 * The single RTK Query API slice. Features add their endpoints with
 * `api.injectEndpoints`, so each feature owns its queries while sharing one
 * cache, one middleware and request de-duplication.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  // Catalog data changes rarely; keep it for 5 minutes after the last subscriber unmounts.
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
});
