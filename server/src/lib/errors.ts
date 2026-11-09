import type { GraphQLFormattedError } from "graphql";
import { unwrapResolverError } from "@apollo/server/errors";
import { ZodError } from "zod";

export type ErrorCode = "NOT_FOUND" | "BAD_USER_INPUT" | "UNAUTHENTICATED";

/** An expected failure whose message is safe to show to API clients. */
export class AppError extends Error {
  constructor(
    message: string,
    readonly code: ErrorCode,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const notFound = (entity: string, key: string) => new AppError(`${entity} "${key}" was not found.`, "NOT_FOUND");
export const badInput = (message: string) => new AppError(message, "BAD_USER_INPUT");
export const unauthenticated = () =>
  new AppError("This operation requires a valid admin token.", "UNAUTHENTICATED");

/**
 * Maps domain and validation errors to GraphQL error codes, and hides the
 * details of unexpected errors in production.
 */
export function createErrorFormatter(isProduction: boolean) {
  return (formatted: GraphQLFormattedError, error: unknown): GraphQLFormattedError => {
    const original = unwrapResolverError(error);

    if (original instanceof AppError) {
      return { ...formatted, message: original.message, extensions: { code: original.code } };
    }
    if (original instanceof ZodError) {
      return {
        ...formatted,
        message: "Invalid input.",
        extensions: {
          code: "BAD_USER_INPUT",
          issues: original.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
        },
      };
    }
    const code = formatted.extensions?.code;
    if (isProduction && (code === undefined || code === "INTERNAL_SERVER_ERROR")) {
      return { message: "Internal server error.", extensions: { code: "INTERNAL_SERVER_ERROR" } };
    }
    return formatted;
  };
}
