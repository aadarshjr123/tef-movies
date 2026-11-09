import { useId } from "react";
import { useSearchParams } from "react-router";
import { useGetCollectionsQuery } from "@/features/catalog/catalog.api";
import { CollectionRow } from "@/features/catalog/CollectionRow";
import { TitleGrid } from "@/features/titles/components/TitleGrid";
import { useSearchTitlesQuery } from "@/features/titles/titles.api";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { useDocumentTitle } from "@/shared/hooks/useDocumentTitle";
import { EmptyState, ErrorState, PageSpinner } from "@/shared/ui/feedback";
import { SearchIcon } from "@/shared/ui/icons";
import { Section } from "@/shared/ui/Section";

const MIN_QUERY_LENGTH = 2;

function BrowseTiles() {
  const collections = useGetCollectionsQuery("COLLECTION");
  const genres = useGetCollectionsQuery("GENRE");
  return (
    <>
      <CollectionRow title="Movie collections" query={collections} />
      <CollectionRow title="Genres" query={genres} />
    </>
  );
}

/**
 * Search as you type. The query lives in the URL (?q=…) so results can be
 * shared and survive reloads; requests wait until typing pauses.
 */
export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const debounced = useDebouncedValue(query.trim(), 300);
  const inputId = useId();
  useDocumentTitle(query ? `Search: ${query}` : "Search");

  const ready = debounced.length >= MIN_QUERY_LENGTH;
  const { data, isFetching, error, refetch } = useSearchTitlesQuery(debounced, { skip: !ready });
  const movies = data?.filter((t) => t.kind === "MOVIE") ?? [];
  const tvShows = data?.filter((t) => t.kind === "TV_SHOW") ?? [];

  return (
    <div className="pt-4">
      <form role="search" onSubmit={(event) => event.preventDefault()} className="px-4 sm:px-8">
        <label htmlFor={inputId} className="sr-only">
          Search movies, TV shows, genres and cast
        </label>
        <div className="relative mx-auto max-w-2xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            id={inputId}
            type="search"
            // The user came here to type a search, so the field starts focused.
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={query}
            onChange={(event) => setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })}
            placeholder="Search movies, TV shows, genres and cast…"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 font-mono text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 dark:border-night-border dark:bg-night-raised dark:text-white"
          />
        </div>
      </form>

      {!ready ? (
        <BrowseTiles />
      ) : isFetching && !data ? (
        <PageSpinner />
      ) : error ? (
        <div className="mt-6">
          <ErrorState error={error} onRetry={refetch} />
        </div>
      ) : data?.length === 0 ? (
        <EmptyState>{`No results for “${debounced}”.`}</EmptyState>
      ) : (
        <div aria-live="polite" className={isFetching ? "opacity-60 transition-opacity" : ""}>
          {movies.length > 0 && (
            <Section title="Movies">
              <TitleGrid titles={movies} label="Movie results" />
            </Section>
          )}
          {tvShows.length > 0 && (
            <Section title="TV shows">
              <TitleGrid titles={tvShows} label="TV show results" />
            </Section>
          )}
        </div>
      )}
    </div>
  );
}
