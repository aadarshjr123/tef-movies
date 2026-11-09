import type { BaseQueryFn } from "@reduxjs/toolkit/query";

/** A GraphQL document; codegen's TypedDocumentString stringifies to the query text. */
interface GraphQLDocument {
  toString(): string;
}

export interface GraphQLRequest {
  document: GraphQLDocument;
  variables?: Record<string, unknown>;
}

export interface ApiError {
  /** HTTP status, or a string for failures that never got a usable response. */
  status: number | "FETCH_ERROR" | "GRAPHQL_ERROR" | "PARSE_ERROR";
  message: string;
  /** GraphQL error code from the server, e.g. NOT_FOUND or BAD_USER_INPUT. */
  code?: string;
}

interface GraphQLResponse {
  data?: unknown;
  errors?: { message: string; extensions?: { code?: string } }[];
}

/**
 * RTK Query base query for a GraphQL endpoint. It normalises transport,
 * HTTP and GraphQL errors into one ApiError shape, so components handle a
 * single error type.
 */
export function graphqlBaseQuery({ url }: { url: string }): BaseQueryFn<GraphQLRequest, unknown, ApiError> {
  return async ({ document, variables }, { signal }) => {
    let response: Response;
    try {
      response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: document.toString(), variables }),
        signal,
      });
    } catch {
      return {
        error: { status: "FETCH_ERROR", message: "Couldn't reach the server. Check your connection and try again." },
      };
    }

    let body: GraphQLResponse;
    try {
      body = (await response.json()) as GraphQLResponse;
    } catch {
      return {
        error: {
          status: response.ok ? "PARSE_ERROR" : response.status,
          message: `Unexpected response (HTTP ${response.status}).`,
        },
      };
    }

    const [firstError] = body.errors ?? [];
    if (firstError) {
      return { error: { status: "GRAPHQL_ERROR", message: firstError.message, code: firstError.extensions?.code } };
    }
    if (!response.ok || body.data === undefined) {
      return { error: { status: response.status, message: `Request failed (HTTP ${response.status}).` } };
    }
    return { data: body.data };
  };
}
