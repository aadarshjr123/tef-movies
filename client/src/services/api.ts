import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlBaseQuery } from "./graphqlBaseQuery";

export const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:4000/graphql";

/**
 * The single RTK Query API slice. Features add their endpoints with
 * `api.injectEndpoints`, so each feature owns its queries while sharing one
 * cache, one middleware and request de-duplication.
 */
export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlBaseQuery({ url: API_URL }),
  // Catalog data changes rarely; keep it for 5 minutes after the last subscriber unmounts.
  keepUnusedDataFor: 300,
  endpoints: () => ({}),
});
