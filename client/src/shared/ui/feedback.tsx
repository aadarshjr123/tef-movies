import type { ApiError } from "@/services/graphqlBaseQuery";

/** Normalises RTK Query's error union into a message. */
export function errorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) return String((error as ApiError).message);
  return "Something went wrong.";
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="mx-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 sm:mx-8 dark:text-red-300"
    >
      <p>{errorMessage(error)}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-2 font-semibold underline underline-offset-2">
          Try again
        </button>
      )}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`animate-pulse rounded-md bg-gray-200 dark:bg-night-raised ${className}`} />;
}

/** Placeholder row shaped like a row of title cards. */
export function CardRowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading" className="flex gap-3 overflow-hidden px-4 sm:gap-5 sm:px-8">
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="aspect-[2/3] w-32 shrink-0 sm:w-40 lg:w-44" />
      ))}
    </div>
  );
}

export function PageSpinner() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
    </div>
  );
}

export function EmptyState({ children }: { children: string }) {
  return <p className="px-4 py-10 text-center text-sm text-gray-500 sm:px-8 dark:text-gray-400">{children}</p>;
}
